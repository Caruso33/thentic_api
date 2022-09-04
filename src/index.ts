import { createContract, showContracts } from "./api"
import { CreateContractData, ShowContractsData } from "./types"

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
    console.log("Found following contracts: ")
    console.log(data?.contracts)

    return data?.contracts
  } catch (e: any) {
    console.error(`Error showing Contracts: ${e.message}`)
  }
}

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftData = { chainId, name, shortName }

  // await createNftContract(nftData)

  const contractData = await showNftContracts({ chainId })

  if (!contractData || contractData?.length === 0) {
    console.error(`No contract data found`)
    process.exit(0)
  }

  const contractAddress = contractData[0].contract
  console.log(`Contract address is: ${contractAddress}`)
}

main()
