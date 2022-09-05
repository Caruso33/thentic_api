import axios from "axios"
import "dotenv/config"
import {
  CreateContractData,
  MintNftData,
  ShowContractsData,
  ShowNftsData,
} from "./types"

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

export function showContracts(nftData: ShowContractsData) {
  return axios.get(
    `https://thentic.tech/api/contracts?key=${THENTIC_API_KEY}&chain_id=${nftData.chainId}`
  )
}

export function showNfts(nftData: ShowNftsData) {
  return axios.get(
    `https://thentic.tech/api/nfts?key=${THENTIC_API_KEY}&chain_id=${nftData.chainId}`
  )
}

export function mintNft(nftData: MintNftData) {
  const url = "https://thentic.tech/api/nfts/mint"

  const mintData = {
    key: THENTIC_API_KEY,
    chain_id: nftData.chainId,
    contract: nftData.contract,
    nft_id: nftData.nftIndex,
    nft_data: '{"name":"Multiavatar-0d3ea896b185a709ea.png"}',
    // nft_data: "{'name':'Multiavatar-0d3ea896b185a709ea.png'}",
    // nft_data: "'" + JSON.stringify(nftData.nftData) + "'",
  }

  const options = {
    method: "POST",
    url,
    headers: {
      "content-type": "application/json",
    },
    data: mintData,
  }

  return axios.request(options)
  // return axios.post(url, mintData)
}
