const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    PRODUCTS:   Symbol("products"),
    UPSELL:   Symbol("upsel"),
    EXTRAS:  Symbol("extras")
});

module.exports = class CurbsideHardwares extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.cCategory = "";
        this.sProduct = "";
        this.uUpsell= "";
        this.sExtras = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Curbside Hardwares.<br /> Your Home Hardware Store.");
                aReturn.push(`Find out what's in our store from below link:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if(sInput.toLowerCase() == "cleaning"){
                  this.cCategory = "broom";
                }else if(sInput.toLowerCase() == "electrical") {
                  this.cCategory = "light";
                } else {
                  this.stateCur = OrderState.WELCOMING;
                  aReturn.push("Please type 'CLEANING' if you need cleaning items or 'ELECTRICAL' if you need electrical items.");
                  break;
                }
            case OrderState.PRODUCTS:
                if(this.cCategory == "broom"){
                  this.stateCur = OrderState.UPSELL;
                  aReturn.push(`Would you like to buy 1. Brooms and Dust Bins, 2. Snow shovels`);
                  aReturn.push(`Enter the product code 1 or 2`);
                }else{
                  this.stateCur = OrderState.UPSELL;
                  aReturn.push(`Would you like to buy 1. Light Bulbs, 2. Led Light, 3.Electric kettle`);
                  aReturn.push(`Enter the product code 1, 2 or 3`);
                }
                if(sInput.toLowerCase()!= "no"){
                  this.sProduct = sInput;
                }
                break;
            case OrderState.UPSELL:
                this.uUpsell = sInput;
                this.stateCur = OrderState.EXTRAS
                aReturn.push("Would you like to buy Simonize car cloths or Ear Buds");
                break;
            case OrderState.EXTRAS:
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                }
                aReturn.push(`product id: ${this.uUpsell + this.sProduct}`);
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if(this.sProduct.toLowerCase() == "cleaning" && this.uUpsell.toLowerCase() == 1){
                  aReturn.push("Brooms and Dust Bins");
                  this.nTotal += 4;
                }else if(this.sProduct.toLowerCase() == "cleaning" && this.uUpsell.toLowerCase == 2){
                  aReturn.push("Snow shovels");
                  this.nTotal += 10;
                }else if(this.sProduct.toLowerCase() == "electrical" && this.uUpsell.toLowerCase() == 1){
                  aReturn.push("Light Bulbs");
                  this.nTotal += 5.99;
                }else if(this.sProduct.toLowerCase() == "electrical" && this.uUpsell.toLowerCase == 2){
                  aReturn.push("Led Light");
                  this.nTotal += 3.99;
                }else if(this.sProduct.toLowerCase() == "electrical" && this.uUpsell.toLowerCase == 3){
                    aReturn.push("Electric kettle");
                    this.nTotal += 13.99;
                }
                if(this.sExtras){
                  aReturn.push(this.sExtras);
                  this.nTotal += 4;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c10 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  background-color: #ffffff;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 217.5pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c12 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  background-color: #ffffff;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 226.5pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c13 {
                  -webkit-text-decoration-skip: none;
                  color: #2f5597;
                  font-weight: 700;
                  text-decoration: underline;
                  vertical-align: baseline;
                  text-decoration-skip-ink: none;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c21 {
                  -webkit-text-decoration-skip: none;
                  color: #2f5597;
                  font-weight: 700;
                  text-decoration: underline;
                  vertical-align: baseline;
                  text-decoration-skip-ink: none;
                  font-size: 36pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c20 {
                  background-color: #ffffff;
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: center
              }
      
              .c3 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c16 {
                  color: #000000;
                  font-weight: 700;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 26pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c11 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 18pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c2 {
                  background-color: #ffffff;
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c6 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Times New Roman";
                  font-style: normal
              }
      
              .c0 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 26pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c17 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 22pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c19 {
                  -webkit-text-decoration-skip: none;
                  color: #2f5597;
                  font-weight: 700;
                  text-decoration: underline;
                  text-decoration-skip-ink: none;
                  font-size: 26pt
              }
      
              .c5 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: right
              }
      
              .c4 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c14 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c18 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c8 {
                  height: 53.2pt
              }
      
              .c15 {
                  height: 83.2pt
              }
      
              .c7 {
                  height: 48pt
              }
      
              .c1 {
                  height: 51.8pt
              }
      
              .c9 {
                  height: 11pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c18">
          <p class="c20"><span class="c16">Curbside Hardware</span></p>
          <p class="c2"><span class="c17">Order your home maintenance essentials</span></p>
          <p class="c2"><span class="c19">Text &ldquo;Cleaning&rdquo; or &ldquo;Electrical&rdquo; to </span><span
                  class="c21">519-001-1000</span></p>
          <p class="c2"><span class="c13">&nbsp;</span></p><a id="t.740814f75033011e8111e0da8e6e96d05b895bc8"></a><a
              id="t.0"></a>
          <table class="c14">
              <tbody>
                  <tr class="c8">
                      <td class="c10" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Light Bulbs</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c5"><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; </span><span class="c0">5.99</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c10" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Led Light</span></p>
                      </td>
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c5"><span class="c0">3.99</span></p>
                      </td>
                  </tr>
                  <tr class="c8">
                      <td class="c10" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Electric kettle</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c5"><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; </span><span class="c0">13.99</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                  </tr>
                  <tr class="c15">
                      <td class="c10" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Brooms &amp; Dust Bins</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c5"><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp;</span><span class="c0">4</span></p>
                          <p class="c4"><span class="c3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
                      </td>
                  </tr>
                  <tr class="c7">
                      <td class="c10" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Snow shovels</span></p>
                      </td>
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c5"><span class="c0">10</span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c2"><span class="c0">&nbsp;</span></p>
          <p class="c2"><span class="c11">We also have Simonize car cloths, Ear Buds.</span></p>
          <p class="c4"><span class="c6">&nbsp;</span></p>
          <p class="c4"><span class="c3">&nbsp;</span></p>
          <p class="c4 c9"><span class="c3"></span></p>
      </body>
      
      </html>     `);
  
    }
}
