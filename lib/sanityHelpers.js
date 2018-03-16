module.exports = {
    getPage : async (client, location) => {
        let result = await client.fetch(`*[_type == "page" && title == "${location}"]`).then(page => {
            const resultObject = page[0]
            return resultObject;
        })
        return result;
    },
    getProjects: async (client) => {
        let result = await client.fetch(`*[_type == "thingIMade"]`).then(things => {
            return things;
        })
        return result;
    }
}
