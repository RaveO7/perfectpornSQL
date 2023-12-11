"use server";

export async function getAllProducts() {
    const apiUrlEndpoint = "/api/getData-lib"
    const response = await fetch(apiUrlEndpoint)
    const res = await response.json()

    return res.products
}

export async function getSelectedShoes(params: any) {
    console.log(params.id)
    const apiUrlEndpoint ="/api/getDataSelectedShoes"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: params.id,
        })
    }

    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()
}