// Application id from moralis.io
Moralis.initialize('igDYNSIRB7leqHRpnUuNPfplY1fn0Y60fp5AM8zV');
//Server url from moralis.io
Moralis.serverURL = 'https://e1qealego843.moralisweb3.com:2053/server';

async function login() {
    try {
        await ethereum.enable();
        user = await Moralis.Web3.authenticate();
        console.log(user);
        alert("User logged in");
        hideLogin();
        renderRugs();
    } catch (error) {
        console.log(error);
    }
}

async function hideLogin() {
	$('#login_button').hide();
}

async function renderRugs() {
	const user = Moralis.User.current();
	const userAddress = user.get("ethAddress");
	const openseaRugs = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=8bit-rugs&owner=' + userAddress);
	const json = await openseaRugs.json();

	// create a query on the EthTransactions collection
	console.log(json);

	$.each(openseaRugs.assets, function(i, v) {
	    console.log(v.image_url);
	    addRug(v.image_url, v.name)
	})

	$('#rugs').show();
}

function addRug(rug, description) {
  var ul = document.getElementById("rugs");
  var img = document.createElement("img");
  var li = document.createElement("li");

  img.src = rug;
  li.innerHtml = description;

  ul.appendChild(img);
  ul.appendChild(li);
}


document.getElementById("login_button").onclick = login;