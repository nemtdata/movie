/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openSidebar() {
    document.getElementById("mySideContainer").style.width = "700px";
    document.getElementById("mySideContainer").style.padding = "20px";
    document.getElementById("mainContainer").style.marginRight = "740px";
    document.body.style.backgroundColor = "#060606";


}
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeSidebar() {
    document.getElementById("mySideContainer").style.width = "0";
    document.getElementById("mySideContainer").style.padding = "0";
    document.getElementById("mainContainer").style.marginRight = "0";
    document.body.style.backgroundColor = "#121212";
  }
  

  