function positive_whole_number_test_fail(n)
{
  if (n > Math.floor(n)) {
    return true;
  }
  if(n===0){
    return true;
  }
  var result = (n - Math.floor(n)) !== 0; // found on w3resources
  if (result)
    return false;
   else
     return true;
  }

module.exports = {
  checkId(id) {
    if (!id) throw 'invalid ID';
    if (typeof id !== 'string') throw 'invalid ID';
    id = id.trim();
    if (id.length === 0)
      throw 'invalid ID';
    let neg = -1;
    if(!(/^\d+$/.test(id))) throw 'invalid ID'
    if(id.indexOf(".")!==neg) throw 'invalid ID';
    if(id.indexOf("0")===0) throw 'invalid ID';
    id = parseInt(id);
    if(id==0) throw 'invalid ID';
    if(id<1) throw 'invalid ID';

    if (!positive_whole_number_test_fail(id)) throw 'invalid ID';
    return id.toString();
  },

};
