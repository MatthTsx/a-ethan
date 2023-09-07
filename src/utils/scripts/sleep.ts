const sleep = async (ts: number) => {
    return await new Promise(resolve => setTimeout(() =>resolve(0), ts))
}

export default sleep