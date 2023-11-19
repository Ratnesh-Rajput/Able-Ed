import { GetServerSidePropsContext } from 'next'
import NextAuth, { NextAuthOptions, unstable_getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'
import type { APIGuildMember } from 'discord-api-types/v10'
import TwitterProvider, { TwitterProfile } from 'next-auth/providers/twitter'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import TwitchProvider from 'next-auth/providers/twitch'
import { prisma } from '~/lib'
import {
	getGuildMember,
	checkGuildMember,
	guildID,
	updateDiscordProfileSchema,
} from '~/lib/externalAPI'
import { updateServerMember } from '~/lib/db/queries'
import { env } from '~/lib/env.mjs'
import { OAuthUserConfig } from 'next-auth/providers'

/**
 * It generates a random string of random length
 * @returns A string of random characters.
 */
const generateRandomString = () => {
	let randomString = ''
	const randomNumber = Math.floor(Math.random() * 10)

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94))
	}

	return randomString
}
const authProviders = []

/**
 * Discord Auth Provider Setup
 */
const discordProvider = DiscordProvider({
	clientId: env.DISCORD_CLIENT_ID,
	clientSecret: env.DISCORD_CLIENT_SECRET,
	authorization: {
		url: 'https://discord.com/api/oauth2/authorize',
		params: {
			scope: 'identify email guilds guilds.members.read',
			state: generateRandomString(),
			display: 'popup',
		},
	},
	checks: 'state',
	async profile(profile: DiscordProfile, tokens) {
		const discordGuild = await getGuildMember(tokens.access_token as string)
		const guildProfile = discordGuild?.data
		if (profile.avatar === null) {
			const defaultAvatarNumber = parseInt(profile.discriminator) % 5
			profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
		} else {
			if (typeof guildProfile?.avatar === 'string') {
				// Use server specific avatar, if exists
				const format = guildProfile.avatar.startsWith('a_') ? 'gif' : 'png'
				profile.image_url = `https://cdn.discordapp.com/guilds/${guildID}/avatars/${profile.id}/${guildProfile.avatar}.${format}`
			} else {
				// use Discord global profile avatar
				const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
				profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
			}
		}
		profile.name = guildProfile?.nick ?? profile.username

		return {
			id: profile.id,
			discordId: profile.id,
			name: profile.name,
			discordTag: `${profile.username}#${profile.discriminator}`,
			email: profile.email,
			image: profile.image_url,
			serverMember: !!guildProfile,
		}
	},
})
authProviders.push(discordProvider)

/**
 * Twitter Auth Provider Setup - if env vars exist
 */
if (env.TWITTER_CLIENT_ID && env.TWITTER_CLIENT_SECRET) {
	const twitterProvider = TwitterProvider({
		clientId: env.TWITTER_CLIENT_ID,
		clientSecret: env.TWITTER_CLIENT_SECRET,
		version: '2.0',
	})
	authProviders.push(twitterProvider)
}

/**
 * Discord Auth Provider Setup - if env vars exist
 */
if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
	const githubProvider = GithubProvider({
		clientId: env.GITHUB_CLIENT_ID,
		clientSecret: env.GITHUB_CLIENT_SECRET,
	})
	authProviders.push(githubProvider)
}

const authOptions: NextAuthOptions = {
	providers: authProviders,
	callbacks: {
		async signIn({ user, account }) {
			// Is the account disabled? Get out of here!
			if (user.userDisabled) return false
			// Linking an account? Proceed.
			if (account.provider === 'twitter' || account.provider === 'github')
				return true
			if (account.provider === 'discord')
				await updateDiscordProfileSchema(user, account)
			// 100Devs Discord server member? proceed!
			if (user.serverMember) return true
			// check to see if user is a member of the discord server & update status if they are
			const serverMemberStatus = !!account.access_token
				? await checkGuildMember(account.access_token)
				: false
			if (serverMemberStatus) {
				updateServerMember(account.userId, serverMemberStatus)
				return true
			}
			// nope, get out.
			return false
		},
		async session({ session, user }) {
			session.user.id = user.id
			session.user.role = user.role
			session.user.name = user.name
			return session
		},
	},
	pages: {
		newUser: '/dashboard/profile?newuser=true',
	},
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	events: {
		signIn: (message) =>
			console.info(
				'\x1b[1mUser Signin:\x1b[0m',
				`ID: ${message.user.id}; Discord Tag: ${message.user.discordTag}`
			),
		createUser: (message) =>
			console.info(
				'\x1b[1mCreate User:\x1b[0m',
				`ID: ${message.user.id}; Discord Tag: ${message.user.discordTag}`
			),
		session: (message) =>
			console.info(
				'\x1b[1mSession Request:\x1b[0m',
				`ID: ${message.session.user.id}`
			),
		linkAccount: (message) =>
			console.info(
				'\x1b[1mLink Account:\x1b[0m',
				`User ID: ${message.user.id}`,
				`Linked Service: ${message.account.provider}`
			),
	},
}

/**
 * It gets the session from the server
 * @param req - The request object from the server.
 * @param res - The response object from the server.
 * @returns The session object
 */
export const getServerSession = async (
	req: GetServerSidePropsContext['req'],
	res: GetServerSidePropsContext['res']
) => {
	const session = await unstable_getServerSession(req, res, authOptions)
	return session
}

export default NextAuth(authOptions)
