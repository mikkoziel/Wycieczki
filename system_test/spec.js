const { element } = require("protractor");

// spec.js
describe('Wycieczki App', function() {
  var baseURl = 'http://localhost:4200'

  beforeEach(async()=>{
    browser.ignoreSynchronization = true;
    browser.driver.sleep(1000)
    // browser.get(baseURl  +'/login');
    // browser.driver.sleep(6000)

    // element(by.id("logout")).isDisplayed().then(function(result) {
    // // if(logoutBttn.isPresent()){
    //   if(result){
    //     element(by.id("logout")).click();
    //     browser.driver.sleep(5000);   
    //   } else{
    //     browser.driver.sleep(10);
    //   }
    // })
  });
 
  it('should try login with wrong password', () => {
    browser.get(baseURl  +'/login');

    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
    
    element(by.id('login-field')).clear().sendKeys("admin@gmail.com");
    browser.driver.sleep(1000)   
    element(by.id("password-field")).clear().sendKeys("qwerty");
    browser.driver.sleep(1000)   
    element(by.id("login-bttn")).click()
    browser.driver.sleep(5000)
    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
  });
  
  it('should try login with wrong login', async() => {
    browser.get(baseURl  +'/login');

    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
    
    element(by.id('login-field')).clear().sendKeys("abcds@gmail.com");
    browser.driver.sleep(1000)   
    element(by.id("password-field")).clear().sendKeys("123456");
    browser.driver.sleep(1000)   
    element(by.id("login-bttn")).click()
    browser.driver.sleep(5000)
    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
  });
  
  it('should try login with wrong data', async() => {
    browser.get(baseURl  +'/login');

    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
    
    element(by.id('login-field')).clear().sendKeys("vbnmk@gmail.com");
    browser.driver.sleep(1000)   
    element(by.id("password-field")).clear().sendKeys("qwerty");
    browser.driver.sleep(1000)   
    element(by.id("login-bttn")).click()
    browser.driver.sleep(5000)
    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
  });

  it('should login with correct data', async() => {
    browser.get(baseURl  +'/login');

    expect(element(by.id("not-logged")).isDisplayed()).toBeTrue;
    
    element(by.id('login-field')).clear().sendKeys("admin@gmail.com");
    browser.driver.sleep(1000)   
    element(by.id("password-field")).clear().sendKeys("123456");
    browser.driver.sleep(1000)   
    element(by.id("login-bttn")).click()
    browser.driver.sleep(5000)
    expect(element(by.id("logged")).isDisplayed()).toBeTrue;
  });

  it('should navigate trough app', async() => {
    browser.get(baseURl);
    element(by.id("home-bttn")).click()
    browser.driver.sleep(5000)   
    expect(element(by.tagName("app-lista-wycieczek")).isDisplayed()).toBeTrue;  

    browser.refresh()
    browser.driver.sleep(5000)   
    expect(element(by.tagName("app-lista-wycieczek")).isDisplayed()).toBeTrue;   

    element(by.linkText('Cart')).click()
    browser.driver.sleep(5000)   
    expect(element(by.id("koszyk-body")).isDisplayed()).toBeTrue;

    element(by.linkText('Home')).click()
    browser.driver.sleep(5000)   
    expect(element(by.tagName("app-lista-wycieczek")).isDisplayed()).toBeTrue;

    element(by.linkText('Login')).click()
    browser.driver.sleep(5000)   
    expect(element(by.id("login-div")).isDisplayed()).toBeTrue;

  });

  it('should filter field list', async() => {
    browser.get(baseURl);
    browser.driver.sleep(5000)   
    expect(element(by.tagName("app-lista-wycieczek")).isDisplayed()).toBeTrue;  

    var submitBttn = element(by.id("submit-filter"));

    element(by.id("pricePanel")).click();
    browser.driver.sleep(1000);
    element(by.id("minPrice")).sendKeys(100);
    submitBttn.click();
    browser.driver.sleep(1000);
    element.all(by.tagName("app-wycieczka")).then((x)=>{
      expect(x.length).not.toBe(5);
      element(by.id("clear-filter")).click();
      browser.driver.sleep(1000);
    })

    element(by.id("maxPrice")).sendKeys(100);
    submitBttn.click();
    browser.driver.sleep(1000);
    element.all(by.tagName("app-wycieczka")).then((x)=>{
      expect(x.length).not.toBe(5);
      element(by.id("clear-filter")).click();
      browser.driver.sleep(1000);
    })

    element(by.id("datePanel")).click();
    browser.driver.sleep(1000);
    element(by.id("mat-date-range-input-0")).sendKeys("05/02/2020");
    submitBttn.click();
    browser.driver.sleep(1000);
    element.all(by.tagName("app-wycieczka")).then((x)=>{
      expect(x.length).not.toBe(5);
      element(by.id("clear-filter")).click();
      browser.driver.sleep(1000);
    })

    element(by.id("maxDate")).sendKeys("01/04/2021");
    submitBttn.click();
    browser.driver.sleep(1000);
    element.all(by.tagName("app-wycieczka")).then((x)=>{
      expect(x.length).not.toBe(5);
      element(by.id("clear-filter")).click();
      browser.driver.sleep(1000);
    })

    element(by.id("countryPanel")).click();
    browser.driver.sleep(1000);
    element.all(by.id("countries-list")).get(0).click();
    submitBttn.click();
    browser.driver.sleep(1000);
    element.all(by.tagName("app-wycieczka")).then((x)=>{
      expect(x.length).not.toBe(5);
      element(by.id("clear-filter")).click();
      browser.driver.sleep(1000);
    })

    element(by.id("clear-filter")).click();
    browser.driver.sleep(1000);
  });

  it('should update Wycieczka', async() => {
    browser.get(baseURl);
    browser.driver.sleep(5000)   
    element.all(by.id("update-wycieczka")).get(0).click();
    browser.driver.sleep(1000);

    var sendBttn = element(by.id("send")); 

    var elem = element(by.id("name"));
    var tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);

    elem = element(by.id("country"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("startDate"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("endDate"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("price"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("seats"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("description"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("image_url"));
    tmp = elem.getAttribute('value');
    elem.sendKeys("");
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);
    
    elem = element(by.id("cyclic_long"));
    tmp = elem.getAttribute('value');
    elem.sendKeys(0);
    sendBttn.click();
    browser.driver.sleep(1000);
    expect(element(by.id("errors")).isDisplayed()).toBeTrue;
    elem.sendKeys(tmp);

    sendBttn.click();
    browser.driver.sleep(1000);  
  });

  it('should handle adding and removing to/from Cart', async() => {
    browser.get(baseURl);
    browser.driver.sleep(5000)   
    element.all(by.id("more-wycieczka")).get(1).click();
    browser.driver.sleep(1000);
    
    element(by.id('dates')).element(by.tagName('mat-select')).click();
    element.all(by.tagName("mat-option")).get(0).click();
    browser.driver.sleep(1000);
    element(by.id("plus")).click();
    browser.driver.sleep(1000);
    element.all(by.id("reservedTrips")).then((x)=>{
      expect(x.length).toBe(1);
    })
    browser.driver.sleep(1000);
    element(by.id("minus")).click();
    browser.driver.sleep(1000);
    element.all(by.id("reservedTrips")).then((x)=>{
      expect(x.length).toBe(0);
    })
  });

  it('should confirm cart', async() => {
    browser.get(baseURl);
    browser.driver.sleep(5000)   
    element.all(by.id("more-wycieczka")).get(1).click();
    browser.driver.sleep(1000);

    element(by.id('dates')).element(by.tagName('mat-select')).click();
    element.all(by.tagName("mat-option")).get(0).click();
    browser.driver.sleep(1000);
    element(by.id("plus")).click();
    browser.driver.sleep(1000);
    element.all(by.id("reservedTrips")).then((x)=>{
      expect(x.length).toBe(1);
    })

    element(by.linkText('Cart')).click()
    browser.driver.sleep(5000)   
    expect(element(by.id("koszyk-body")).isDisplayed()).toBeTrue;

    element.all(by.id("cart-item")).then((x)=>{
      expect(x.length).toBe(1);
    })
    element.all(by.id("confirm-bttn")).click()
    browser.driver.sleep(5000)   

    expect(element(by.id("confirmation-body")).isDisplayed()).toBeTruthy;
    element.all(by.id("submit-bttn")).click()
    browser.driver.sleep(5000)  

    element.all(by.id("cart-item")).then((x)=>{
      expect(x.length).toBe(0);
    }) 

  });

  function login(){
    browser.get(baseURl  +'/login');

    element(by.id('login-field')).clear().sendKeys("admin@gmail.com");
    element(by.id("password-field")).clear().sendKeys("123456");
    element(by.id("login-bttn")).click()
    browser.driver.sleep(5000)    
  }
});
