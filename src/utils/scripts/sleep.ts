const sleep = async (ts: number) => {
    //@ts-ignore
    return await new Promise(resolve => setTimeout(() =>resolve(), ts))
}

export default sleep