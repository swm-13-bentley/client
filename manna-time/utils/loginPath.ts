export const getLoginPath = (redirect: string) => {
    return `/ko/login?redirectUrl=${encodeURIComponent(redirect)}`
}