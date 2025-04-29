import { User } from "@/helper/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: User) => {
    // console.log(value,'store data')
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: value._id,
          name: value.name,
          email: value.email,
          phoneNumber: value.phoneNumber,
          point:value.point,
          created_at:value.created_at
        })
      );

      console.log("Data stored successfully");
      
    } catch (e) {
      console.log(e);
    }
  };
const deleteUser = async ()=>{
    try{
        await AsyncStorage.removeItem('user')
    }catch (e){
        console.log(e)
    }
}

export {storeData, deleteUser}