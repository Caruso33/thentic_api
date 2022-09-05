import {
  createNftContract,
  showNftContracts,
  readData,
  showCurrentNfts,
  mintNfts,
  transferANft,
} from "./helper"

async function main() {
  const chainId = 80001 // mumbai
  const name = "Thentic Tobias Leinss Application"
  const shortName = "TTLA"

  const nftContractData = { chainId, name, shortName }

  const ownerAddress = "0x4bFC74983D6338D3395A00118546614bB78472c2"
  const transferToAddress = "0x6a439b14f527d8731794B982d785b72F5d245c6f"

  //
  // create nft contract
  //

  // await createNftContract(nftContractData)

  //
  // fetch nft contracts for given key
  //

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

  //
  // read local nft data to mint them
  //

  const dirPath = "./data"
  const nftData = await readData(dirPath)
  console.log(`Nft Data found in path: ${JSON.stringify(nftData, null, 2)}`)

  const currentNfts = await showCurrentNfts(nftContractData)

  //
  // Mint Nft
  //

  const nftMintingData = {
    chainId,
    contract: contractAddress,
    to: ownerAddress,
    nftIndex: currentNfts?.length,
  }

  await mintNfts(nftData, nftMintingData)

  //
  // Transfer Nft
  //

  const nftToTransfer = 1
  const nftTransferData = {
    chainId,
    contract: contractAddress,
    from: ownerAddress,
    to: transferToAddress,
    nftIndex: nftToTransfer,
  }

  await transferANft(nftTransferData)
}

main()
