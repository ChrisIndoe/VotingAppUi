
import { render } from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'

function App() {
    return (
        <div className="App">
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <Example />
            </DndProvider>
        </div>
    )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
