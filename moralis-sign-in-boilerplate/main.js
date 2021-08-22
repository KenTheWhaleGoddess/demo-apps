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

	// create a query on the EthTransactions collection
	const userEthNFTs = await Moralis.Web3.getNFTs();
	console.log(userEthNFTs);

	$.each(userEthNFTs, function(i, v) {
	    if (v.token_address == "0x495f947276749ce646f68ac8c248420045cb7b5e") {
	        console.log(v.token_id);
	        alert(v.tokenId);
	        return;
	    }
});	$('#rugs').show();
}

document.getElementById("login_button").onclick = login;