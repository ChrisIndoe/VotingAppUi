import { render } from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return (
        <div className="App">
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
