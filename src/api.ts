import axios from "axios"
import "dotenv/config"

const THENTIC_API_KEY = process.env.THENTIC_API_KEY

interface createContractData {
  chainId: number
  name: string
  shortName: string
}

export function createContract(nftData: createContractData) {
  const { chainId, name, shortName } = nftData

  const data = {
    key: THENTIC_API_KEY,
    chain_id: chainId,
    name,
    short_name: shortName,
  }

  const url = "https://thentic.tech/api/nfts/contract"

  const options = {
    method: "POST",
    url,
    headers: {
      "content-type": "application/json",
    },
    data,
  }

  return axios.request(options)
}
