export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_API_URL || 'pk_test_D4FCE13FBF68995F'
/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */

export const fromImageToUrl = (image) => {
    if (!image) {
        return "../public/vercel.svg"
    }

    if (image.url.indexOf("/") === 0) {
        return `${API_URL}${image.url}`
    }

    return image.url
}