export const generateRandomId = (): string => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5) + Date.now();
}