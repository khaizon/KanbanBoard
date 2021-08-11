import TabsManger from './Components/Board/TabsManager';
import BoardContextProvider from './contexts/BoardContext';



export default function App() {

  return (
    <BoardContextProvider>
      <TabsManger/>
    </BoardContextProvider>
  );
}
