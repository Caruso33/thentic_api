import { AxiosResponse } from "axios"
import fs from "fs"
import path from "path"
import {
  createContract,
  mintNft,
  showContracts,
  showNfts,
  transferNft,
} from "./api"
import {
  CreateContractData,
  IntermediateMintNftData,
  ShowContractsData,
  ShowNftsData,
  TransferNftData,
} from "./types"

export async function createNftContract(
  nftContractData: CreateContractData
): Promise<void> {
  try {
    const { status, data } = await createContract(nftContractData)

    if (status === 200) {
      console.log(
        "Nft Contract successfully created! Please open following url with your browser."
      )
      console.log(`Transaction Url: ${data.transaction_url}`)
    } else {
      console.error(`There was an error with the request. Please try again`)
    }
  } catch (e: any) {
    console.error(`Nft Contract couldn't be created! ${e.message}`)
  }
}

export async function showNftContracts(
  nftContractData: ShowContractsData
): Promise<any | void> {
  try {
    const { data } = await showContracts(nftContractData)

    return data?.contracts
  } catch (e: any) {
    console.error(`Error showing Contracts: ${e.message}`)
  }
}

export async function readData(dirPath: string) {
  const dirFiles = await fs.readdirSync(dirPath)

  const jsonData = dirFiles.filter((fileName) => fileName.endsWith(".json"))

  const parsedJsonData: Record<string, any>[] = []

  for (let fileName of jsonData) {
    const fileContent = fs.readFileSync(path.join(dirPath, fileName), {
      encoding: "utf-8",
    })

    const parsedJson: Record<string, any> = JSON.parse(fileContent)
    parsedJsonData.push(parsedJson)
  }

  return parsedJsonData
}

export async function showCurrentNfts(
  nftContractData: ShowNftsData
): Promise<any | void> {
  try {
    const { data } = await showNfts(nftContractData)

    console.log(
      `Current existing Nfts in the given contract: ${JSON.stringify(
        data.nfts,
        null,
        2
      )}`
    )

    return data?.nfts
  } catch (e: any) {
    console.error(`Error showing Nfts: ${e.message}`)
  }
}

export async function mintNfts(
  nftData: Record<string, any>[],
  nftMintingData: IntermediateMintNftData
) {
  const results: AxiosResponse[] = []

  for (const [i, data] of Object.entries(nftData)) {
    const nftIndex = nftMintingData.nftIndex + +i

    try {
      const result = await mintNft({
        ...nftMintingData,
        nftIndex,
        nftData: data,
      })

      results.push(result.data)
    } catch (e: any) {
      console.log(e)
      console.error(`Error minting Nft: ${e.message}`)
    }
  }

  console.log(`Minted ${results.length} Nft(s).`)
  console.log(
    `Open the following urls in your browser to sign the transactions`
  )
  console.log(results.map((r: any) => r.transaction_url).join(" , "))

  return results
}

export async function transferANft(nftData: TransferNftData) {
  try {
    const { data } = await transferNft(nftData)

    console.log(`Transfered Nft with Index ${nftData.nftIndex}.`)
    console.log(
      `Open the following urls in your browser to sign the transaction ${data.transaction_url}`
    )

    return data
  } catch (e: any) {
    console.error(`Error transfering Nft: ${e.message}`)
  }
}
