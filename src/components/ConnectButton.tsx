'use client'

/**
 * Wallet connect button backed by the Freighter wallet context. Exposes both
 * a plain <ConnectButton /> and a <ConnectButton.Custom> render-prop variant
 * for pages that need custom layout around the connect/account state.
 */
import type { ReactNode } from 'react'
import { useWallet } from '@/lib/wallet'
import { formatStellarAddress, getAddressUrl } from '@/lib/stellar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Copy, ExternalLink, LogOut } from 'lucide-react'

interface CustomRenderProps {
  account?: { address: string; displayName: string }
  chain: { unsupported: boolean }
  openConnectModal: () => void
  openAccountModal: () => void
  mounted: boolean
  authenticationStatus: 'authenticated' | 'unauthenticated'
}

function ConnectButton() {
  const { address, isConnected, connect, disconnect, connecting } = useWallet()

  if (isConnected && address) {
    const explorerUrl = getAddressUrl(address)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" title={address}>
            {formatStellarAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => navigator.clipboard.writeText(address)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy address
          </DropdownMenuItem>
          {explorerUrl && (
            <DropdownMenuItem asChild>
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on explorer
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={disconnect} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <Button onClick={connect} disabled={connecting}>
      {connecting ? 'Connecting…' : 'Connect Wallet'}
    </Button>
  )
}

function Custom({
  children,
}: {
  children: (props: CustomRenderProps) => ReactNode
}) {
  const { address, isConnected, connect, disconnect, networkMismatch } = useWallet()
  return (
    <>
      {children({
        account:
          isConnected && address
            ? { address, displayName: formatStellarAddress(address) }
            : undefined,
        chain: { unsupported: networkMismatch },
        openConnectModal: connect,
        openAccountModal: disconnect,
        mounted: true,
        authenticationStatus: isConnected ? 'authenticated' : 'unauthenticated',
      })}
    </>
  )
}

ConnectButton.Custom = Custom

export { ConnectButton }
