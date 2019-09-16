const home = (req, res) => res.send('CI/CD Project - dev')
const page1 = (req, res) => res.send('Page1')
const page2 = (req, res) => res.send('Page2')
const calc = (req, res) => {
  const num1 = parseInt(req.params.num1)
  const num2 = parseInt(req.params.num2)
  if (num2 === 0) {
    res.send('DivisaoZero')
  } else {
    if (num1 % num2 === 0) {
      res.send('Divisivel')
    } else {
      res.send('NaoDivisivel')
    }
  }
}

module.exports = { home, page1, page2, calc }