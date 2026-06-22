export async function waitTimeout(
    promise,
    timeout = 20000,
    message = "Operation timeout"
) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(
                () =>
                    reject(
                        new Error(message)
                    ),
                timeout
            )
        ),
    ]);
}
