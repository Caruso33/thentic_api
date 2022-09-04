import { createContract, showContracts } from "./api"
import { CreateContractData, ShowContractsData } from "./types"
import fs from "fs"
import path from "path"

async function createNftContract(nftData: CreateContractData): Promise<void> {
  try {
    const { status, data } = await createContract(nftData)

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
  nftData: ShowContractsData
): Promise<any | void> {
  try {
    const { data } = await showContracts(nftData)

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

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftContractData = { chainId, name, shortName }

  // await createNftContract(nftContractData)

  const contractData = await showNftContracts({ chainId })

  if (!contractData || contractData?.length === 0) {
    console.error(`No contract data found`)
    process.exit(0)
  } else {
    console.log("Found following contracts: ")
    console.log(contractData)
  }

  const contractAddress = contractData[0].contract
  console.log(`Contract address is: ${contractAddress}`)

  const dirPath = "./data"
  const nftData = await readData(dirPath)
  console.dir(nftData)
}

main()
