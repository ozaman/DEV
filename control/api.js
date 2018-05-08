var userContro = require('./users.js');
var bodyParser = require('body-parser')



function getuser (req, res){
    userContro.Getusers(req, res);

}
function login (req, res){
    userContro.Login(req, res);

}
function getPageData (req, res){
    userContro.GetPageData(req, res);

}
function adduser (req, res){
    userContro.Adduser(req, res);

}
function getalluser (req, res){
    userContro.Getalluser(req, res);

}
function getallagent (req, res){
    agent.Getallagent(req, res);

}
function addwebagent (req, res){
    agent.Addwebagent(req, res);

}
function edituser (req, res){
    userContro.Edituser(req, res);

}
function getBank (req, res){
    bank_list.GetBank(req, res);

}
function newBank (req, res){
    bank_list.NewBank(req, res);
}
function getbank (req, res){
    bank.Getbank(req, res);

}
function getbanklist (req, res){
    bank.Getbanklist(req, res);

}
function addbank (req, res){
    userContro.Addbank(req, res);


}
function getBankpro (req, res){
    bank_list.GetBankpro(req, res);

}
function getBankprobyid (req, res){
    bank_list.GetBankprobyid(req, res);

}
function editBankpro (req, res){
    bank_list.EditBankpro(req, res);

}
function getwebagent (req, res){
    agent.Getwebagent(req, res);

}
function getAgentbyid (req, res){
    agent.GetAgentbyid(req, res);

}
function editWebagent (req, res){
    agent.EditWebagent(req, res);

}
function addBanksection (req, res){
    bank_list.AddBanksection(req, res);

}
function getBanksectionByid (req, res){
    bank_list.GetBanksectionByid(req, res);

}
function getWebagentsection (req, res){
    agent.GetWebagentsection(req, res);

}
function getWebagentsectionByid (req, res){
    agent.GetWebagentsectionByid(req, res);

}
function addWebagentsection (req, res){
    agent.AddWebagentsection(req, res);

}
function getWaprobyid (req, res){
    agent.GetWaprobyid(req, res);

}
function cancelWasectionByid (req, res){
    agent.CancelWasectionByid(req, res);

}
function cancelBanksectionByid (req, res){
    bank_list.CancelBanksectionByid(req, res);

}
function cancelBankpro (req, res){
    bank_list.CancelBankpro(req, res);

}
function getBanksection (req, res){
    bank_list.GetBanksection(req, res);

}
function getBanksectionSearch (req, res){
    bank_list.GetBanksectionSearch(req, res);

}
module.exports = {
    Getusers : getuser,
    Login : login,
    GetPageData : getPageData,
    Adduser : adduser,
    Getalluser : getalluser,
    Getallagent : getallagent,
    Getbank : getbank,
    Addwebagent : addwebagent,
    Edituser : edituser,
    GetBank : getBank,
    NewBank : newBank,
	Getbanklist : getbanklist,
	Addbank : addbank,
    GetBankpro : getBankpro,
    GetBankprobyid :getBankprobyid,
    EditBankpro : editBankpro,
    Getwebagent : getwebagent,
    GetAgentbyid : getAgentbyid,
    EditWebagent :editWebagent,
    AddBanksection : addBanksection,
    GetBanksectionByid : getBanksectionByid,
    GetWebagentsection : getWebagentsection,
    GetWebagentsectionByid : getWebagentsectionByid,
    AddWebagentsection : addWebagentsection,
    CancelWasectionByid : cancelWasectionByid,
    CancelBanksectionByid : cancelBanksectionByid,
    CancelBankpro : cancelBankpro,
    GetBanksection : getBanksection,
    GetWaprobyid : getWaprobyid,
    GetBanksectionSearch : getBanksectionSearch
    
}