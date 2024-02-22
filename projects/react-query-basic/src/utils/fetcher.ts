export async function getRandomNumberFromApi(): Promise<number> {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const strNumber = await res.text()

  // throw new Error('Auxilio!!!')
  return +strNumber
}
