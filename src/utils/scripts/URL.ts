export function isValid_URL(url: string){
    try {
        return Boolean(new URL(url))
    } catch (error) {
        return false
    }
}