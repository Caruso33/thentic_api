import { createContract } from "./api"

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftData = { chainId, name, shortName }

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
  } catch (e) {
    console.error(`Nft Contract couldn't be created! ${e.message}`)
  }
}

main()
