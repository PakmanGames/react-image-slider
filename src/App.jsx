import image1 from './assets/kurumi-day.png'
import image2 from './assets/kurumi-night.png'
import image3 from './assets/kurumi-zafkiel.png'
import image4 from './assets/kurumi-nyan.png'
import image5 from './assets/kurumi-cat.png'

import ImageSlider from './ImageSlider.jsx'

function App() {
  const slides = [
    {url: image1, tile: 'Kurumi Day'},
    {url: image2, tile: 'Kurumi Night'},
    {url: image3, tile: 'Kurumi Zafkiel'},
    {url: image4, tile: 'Kurumi Nyan'},
    {url: image5, tile: 'Kurumi Cat'},
  ]

  return (
    <div className='app-styles'>
      <h1>Kurumi Image Slider</h1>
      <div className='slider-container'>
        <ImageSlider slides={slides} parentWidth={500}/>
      </div>
    </div>
  );
}

export default App
