import type { NextApiResponse } from 'next'
import superjson from 'superjson'
import type { SuperJSONResult } from 'superjson/dist/types'

type JsonObject = {
	[key: string]: any
}

/**
 * It takes a Next.js response object and a data object, and returns a JSON response with the data
 * object with a HTTP status code of 200
 * @param {NextApiResponse} res - NextApiResponse
 * @param data - The data to send back to the client.
 * @returns A function that takes a response and data as parameters.
 */
export function ok(
	res: NextApiResponse<SuperJSONResult>,
	data: Record<string, any>
) {
	return json(res, data)
}

export function created(
	res: NextApiResponse<SuperJSONResult>,
	data: Record<string, any> = { message: 'Record created' }
) {
	return res.status(201).json(superjson.serialize(data))
}

/**
 * It takes a Next.js response object and a data object, and returns a JSON response with the data
 * object serialized using SuperJSON
 * @param res - NextApiResponse<SuperJSONResult>
 * @param data - The data to be serialized.
 * @returns A function that takes a response and data and returns a response with the data serialized.
 */
export function json(
	res: NextApiResponse<SuperJSONResult>,
	data: Record<string, any>
) {
	return res.status(200).json(superjson.serialize(data))
}

/**
 * It sends a response with a given data and type
 * @param res - NextApiResponse<string>
 * @param {string} data - The data to send back to the client.
 * @param [type=text/plain] - The type of data you're sending.
 * @returns The response object
 */
export function send(
	res: NextApiResponse<string>,
	data: string,
	type = 'text/plain'
) {
	res.setHeader('Content-Type', type)

	return res.status(200).send(data)
}

/**
 * It sets the `Location` header to the given URL and returns a 303 status code
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js gives us.
 * @param {string} url - The URL to redirect to.
 * @returns A function that takes a response and a url and redirects the user to the url.
 */
export function redirect(res: NextApiResponse<string>, url: string) {
	res.setHeader('Location', url)

	return res.status(303).end()
}

/**
 * It returns a 400 Bad Request response with a message
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param [msg=400 Bad Request] - The message to send back to the client.
 * @returns A function that takes a response object and a message and returns a response object with a
 * status of 400 and the message.
 */
export function badRequest(
	res: NextApiResponse<string>,
	msg = '400 Bad Request'
) {
	return res.status(400).end(msg)
}

/**
 * It returns a 401 status code and ends the response with a message
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param [msg=401 Unauthorized] - The message to send back to the client.
 * @returns A function that takes a response object and a message string.
 */
export function unauthorized(
	res: NextApiResponse<string>,
	msg = '401 Unauthorized'
) {
	return res.status(401).end(msg)
}

/**
 * It returns a 403 Forbidden response with a message
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param [msg=403 Forbidden] - The message to send back to the client.
 * @returns A function that takes a response object and a message as parameters.
 */
export function forbidden(res: NextApiResponse<string>, msg = '403 Forbidden') {
	return res.status(403).end(msg)
}

/**
 * It returns a 404 status code and a message.
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param [msg=404 Not Found] - The message to send back to the client.
 * @returns A function that takes a response object and a message and returns a response object with a
 * 404 status and the message.
 */
export function notFound(res: NextApiResponse<string>, msg = '404 Not Found') {
	return res.status(404).end(msg)
}

/**
 * If the request method is not allowed, send a 405 response with the message '405 Method Not Allowed'.
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param [msg=405 Method Not Allowed] - The message to send back to the client.
 */
export function methodNotAllowed(
	res: NextApiResponse<string>,
	msg = '405 Method Not Allowed'
) {
	res.status(405).end(msg)
}

/**
 * It sends a 500 Internal Server Error to the client.
 * @param res - The response object
 * @param [msg=500 Internal Server Error] - The message to send to the client.
 */
export function serverError(
	res: NextApiResponse<string>,
	msg = '500 Internal Server Error'
) {
	res.status(500).end(msg)
}

/**
 * It sends a 500 status code and a JSON response with the error object
 * @param {NextApiResponse} res - NextApiResponse - this is the response object that Next.js provides
 * to us.
 * @param error - The error object to be serialized.
 */
export function serverErrorJSON(
	res: NextApiResponse<SuperJSONResult>,
	error: Record<string, any> | Error | unknown
) {
	res.status(500).json(superjson.serialize(error))
}
