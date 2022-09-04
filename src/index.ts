import { createContract, showContracts } from "./api"
import { CreateContractData } from "./types"

async function createNftContract(nftData: CreateContractData) {
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

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftData = { chainId, name, shortName }

  // await createNftContract(nftData)

  const { data } = await showContracts({ chainId })
  console.log("Found following contracts: ")
  console.log(data)
}

main()