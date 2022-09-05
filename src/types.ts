export interface CreateContractData {
  chainId: number
  name: string
  shortName: string
}

export interface ShowContractsData {
  chainId: number
}

export interface ShowNftsData {
  chainId: number
}

export interface IntermediateMintNftData {
  chainId: number
  contract: string
  to: string
  nftIndex: number
}
export interface MintNftData extends IntermediateMintNftData {
  nftData: any
}

export interface TransferNftData {
  chainId: number
  contract: string
  nftIndex: number
  from: string
  to: string
}
