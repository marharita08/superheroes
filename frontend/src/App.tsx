import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Superheroes } from "./pages/superheros/superheroes";
import { Superhero } from "./pages/superhero/superhero";
import { CreateSuperhero } from "./pages/create-superhero/create-superhero";
import { EditSuperhero } from "./pages/edit-superhero/edit-superhero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/superheroes" element={<Superheroes />} />
        <Route path="/superheroes/:id" element={<Superhero />} />
        <Route path="/superheroes/create" element={<CreateSuperhero />} />
        <Route path="/superheroes/edit/:id" element={<EditSuperhero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
