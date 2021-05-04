import MenuHeader from 'src/components/MenuHeader'
const AppLayout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <MenuHeader></MenuHeader>
      {children}
    </>
  )
}

export default AppLayout
