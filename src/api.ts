import { CreateContractData, ShowContracts } from "./types"
import axios from "axios"
import "dotenv/config"

const THENTIC_API_KEY = process.env.THENTIC_API_KEY

export function createContract(nftData: CreateContractData) {
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

export function showContracts(nftData: ShowContracts) {
  return axios.get(
    `https://thentic.tech/api/contracts?key=${THENTIC_API_KEY}&chain_id=${nftData.chainId}`
  )
}
