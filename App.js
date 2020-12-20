import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,ActivityIndicator,Text, TextInput, TouchableOpacity,Image, ImageBackground} from 'react-native';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    dataStateJson : []
    }
  }
  dataJson = [];
  url = 'http://api.tvmaze.com/search/shows?q=';
  movieName = '';
  url1 ='';


  changeUrl=()=>(
    this.setState({dataStateJson:this.dataJson})
  )
  componentDidMount = async () => {
    try {
      const response = await fetch('http://api.tvmaze.com/search/shows?q=superman')
      const data = await response.json()
      this.setState({dataStateJson:data})
    } catch (e){
    }
  }

  componentDidUpdate=async()=>{
    try {
      const response = await fetch(this.url1)
      const data = await response.json()
      this.dataJson = data
    } catch (e){
     console.log(e)
    }  
  }

  TextUpdate(myText){
    this.movieName=myText,
    this.componentDidUpdate(),
    this.url1 =  this.url + this.movieName,
    this.setState({dataStateJson:this.dataJson})

  }
  render() {
      return(
        <>  
        <ImageBackground source={require('./image/myphoto.jpg')} style={styles.image}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.text}>Enter name of your movie</Text>
            <TextInput style={styles.input} onChangeText={(text)=>(this.TextUpdate(text))}/>
            <TouchableOpacity style={styles.button} onPress={this.changeUrl}><Text>Search</Text></TouchableOpacity>
          </View>
          <ScrollView> 
                  {this.state.dataStateJson.map((catalog)=>(
                    <View style={{flex:1}}>
                      <ChangeImage style={styles.imageInput} image = {catalog.show}/> 
                      <Text style={styles.text}>{catalog.show.name}</Text>
                  </View>
                ))}
          </ScrollView>   
        </ImageBackground>
      </>
      )
      
    }
}
export const ChangeImage = (show)=>{
   if(show.image.image!==null){return <><Image style={styles.imageInput} source={{uri:show.image.image.medium}}/><Text style={styles.text}>{show.name}</Text></>}
   else{return <><Image style={styles.imageInput} source ={require('./image/myback.jpg')}/><Text style={styles.text}>{show.nam}</Text></>} 
}
export const styles=StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent : 'center',
  },

  button:{
    flex:0.02,
    borderWidth:2,
    borderColor:'#234',
    alignItems:'center',
    justifyContent : 'center',
    padding:14,
    width:200,
    backgroundColor:'#D7DF01'
  },
  input:{
    borderWidth:2,
    backgroundColor:'#fff',
    borderColor:'#823',
    height:40,
    width:200,
    fontSize:20,
  },
  image :{
  flex:1,
  alignItems:'center',
  justifyContent:'center'
  },
  text:{
    fontSize:26,
    color:'white',
   
    color:'white'
  },
  logotext:{
    fontSize:26,
    color:'#DBA901',
    paddingStart:140,
    paddingBottom:60,
    alignSelf:'flex-end',
  },
  imageInput:{
    height:400,
    width:'100%',
    alignSelf:'stretch'
  }
})


