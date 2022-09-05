import axios, { AxiosResponse } from "axios"
import "dotenv/config"
import {
  CreateContractData,
  MintNftData,
  ShowContractsData,
  ShowNftsData,
  TransferNftData,
} from "./types"

const THENTIC_API_KEY = process.env.THENTIC_API_KEY

export function createContract(
  nftData: CreateContractData
): Promise<AxiosResponse<any, any>> {
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

export function showContracts(
  nftData: ShowContractsData
): Promise<AxiosResponse<any, any>> {
  return axios.get(
    `https://thentic.tech/api/contracts?key=${THENTIC_API_KEY}&chain_id=${nftData.chainId}`
  )
}

export function showNfts(
  nftData: ShowNftsData
): Promise<AxiosResponse<any, any>> {
  return axios.get(
    `https://thentic.tech/api/nfts?key=${THENTIC_API_KEY}&chain_id=${nftData.chainId}`
  )
}

export function mintNft(
  nftData: MintNftData
): Promise<AxiosResponse<any, any>> {
  const url = "https://thentic.tech/api/nfts/mint"

  const mintData = {
    key: THENTIC_API_KEY,
    chain_id: nftData.chainId,
    contract: nftData.contract,
    to: nftData.to,
    nft_id: nftData.nftIndex,
    nft_data: "'" + JSON.stringify(nftData.nftData) + "'",
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
}

export function transferNft(
  nftData: TransferNftData
): Promise<AxiosResponse<any, any>> {
  const url = "https://thentic.tech/api/nfts/transfer"

  const data = {
    key: THENTIC_API_KEY,
    chain_id: nftData.chainId,
    contract: nftData.contract,
    nft_id: nftData.nftIndex,
    from: nftData.from,
    to: nftData.to,
  }

  return axios.post(url, data)
}
