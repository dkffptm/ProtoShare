import Header from './Header'

export default function Layout({ children, hasNewInvite, onNoticeClick, onLogout }) {
  return (
    <>
      <Header hasNewInvite={hasNewInvite} onNoticeClick={onNoticeClick} onLogout={onLogout} />
      <main>{children}</main>
    </>
  )
}
