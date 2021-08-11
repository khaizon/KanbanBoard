import TabsManger from './Components/Board/TabsManager';
import BoardContextProvider from './utils/BoardContext';



export default function App() {

  

  return (
    <BoardContextProvider>
      <TabsManger/>
    </BoardContextProvider>
  );
}
