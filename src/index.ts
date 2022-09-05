import { createContract, mintNft, showContracts, showNfts } from "./api"
import {
  CreateContractData,
  IntermediateMintNftData,
  ShowContractsData,
  ShowNftsData,
} from "./types"
import fs from "fs"
import path from "path"

async function createNftContract(
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

async function showNftContracts(
  nftContractData: ShowContractsData
): Promise<any | void> {
  try {
    const { data } = await showContracts(nftContractData)

    return data?.contracts
  } catch (e: any) {
    console.error(`Error showing Contracts: ${e.message}`)
  }
}

async function readData(dirPath: string) {
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

async function showCurrentNfts(
  nftContractData: ShowNftsData
): Promise<any | void> {
  try {
    const { data } = await showNfts(nftContractData)

    return data?.nfts
  } catch (e: any) {
    console.error(`Error showing Nfts: ${e.message}`)
  }
}

async function mintNfts(
  nftData: Record<string, any>[],
  nftMintingData: IntermediateMintNftData
) {
  for (const [i, data] of Object.entries(nftData)) {
    if (i !== "0") continue

    const nftIndex = nftMintingData.nftIndex + +i

    try {
      await mintNft({
        ...nftMintingData,
        nftIndex,
        nftData: data,
      })
    } catch (e: any) {
      console.log(e)
      console.error(`Error minting Nft: ${e.message}`)
    }
  }
}

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftContractData = { chainId, name, shortName }

  const ownerAddress = "0x4bFC74983D6338D3395A00118546614bB78472c2"

  // await createNftContract(nftContractData)

  const contractData = await showNftContracts({ chainId })

  if (!contractData || contractData?.length === 0) {
    console.error(`No contract data found`)
    process.exit(0)
  } else {
    console.log("Found following contracts: ")
    console.log(contractData)
  }

  // always use first contract (in my solution)
  const contractAddress = contractData[0].contract
  console.log(`Contract address is: ${contractAddress}`)

  const dirPath = "./data"
  const nftData = await readData(dirPath)
  console.log(`Nft Data found in path: ${JSON.stringify(nftData, null, 2)}`)

  const currentNfts = await showCurrentNfts(nftContractData)
  console.log(
    `Current existing Nfts in contracts: ${
      currentNfts?.length === 0 ? 0 : currentNfts
    }`
  )

  const nftMintingData = {
    chainId,
    contract: contractAddress,
    to: ownerAddress,
    nftIndex: currentNfts?.length,
  }

  await mintNfts(nftData, nftMintingData)
}

main()
