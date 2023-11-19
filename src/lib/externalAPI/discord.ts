import axios from 'axios'
import type { APIGuildMember, APIPartialGuild } from 'discord-api-types/v10'
import { Account, User } from 'next-auth'
import { prisma } from '~/lib'
import { DateTime } from 'luxon'

export const guildID = '735923219315425401'

/**
 * It gets the guild member object for the user with the given access token
 * @param {string | undefined} access_token - The access token that you got from the OAuth2 flow.
 * @returns The discord guild user object.
 */
export const getGuildMember = async (access_token: string) => {
	try {
		const res = await axios.get<APIGuildMember>(
			`https://discord.com/api/v10/users/@me/guilds/${guildID}/member`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		return res
	} catch (error) {
		return undefined
	}
}

/**
 * It checks if the user is a member of the guild
 * @param {string} access_token - The access token that you got from the login process.
 * @returns A boolean value
 */
export const checkGuildMember = async (access_token: string) => {
	const guilds = await axios.get<APIPartialGuild[]>(
		'https://discord.com/api/v10/users/@me/guilds',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	)
	if (
		guilds?.data.some((guild) => {
			if (guild.id === guildID) return true
		})
	) {
		return true
	}
	return false
}

// function to update any schema changes after user created

const schemaLastChanged = {
	userProfile20220808: DateTime.fromISO('2022-08-08T15:00', {
		zone: 'America/New_York',
	}).toJSDate(),
}

export const updateDiscordProfileSchema = async (
	user: User,
	account: Account
) => {
	const lastUpdate = user?.updatedAt ? new Date(user.updatedAt) : Date.now()
	console.log('lastUpdate', lastUpdate)
	console.log('schemaLastChanged', schemaLastChanged.userProfile20220808)

	if (lastUpdate < schemaLastChanged.userProfile20220808) {
		console.log('run updates')
		const profile = user
		const guildAPI = await getGuildMember(account.access_token as string)
		if (guildAPI?.status === 200) {
			const guildProfile = guildAPI.data
			if (guildProfile?.avatar) {
				// Use server specific avatar, if exists
				const format = guildProfile.avatar.startsWith('a_') ? 'gif' : 'png'
				profile.image = `https://cdn.discordapp.com/guilds/${guildID}/avatars/${profile.id}/${guildProfile.avatar}.${format}`
			}
			profile.name = guildProfile?.nick ? guildProfile.nick : profile.name

			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: profile.name,
					image: profile.image,
				},
			})
			return
		} else {
			console.error(guildAPI)
			return
		}
	}
	console.log('no updates')
	return
}
