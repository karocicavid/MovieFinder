import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,Text, TextInput, TouchableOpacity,Image, ImageBackground, Modal, Button} from 'react-native';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    dataStateJson : [],
    show:false
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
      this.url1 =  this.url + this.movieName
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
    this.url1 =  this.url + this.movieName
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
                      <TouchableOpacity onPress={()=>(this.setState({show:true}))}>
                        <ChangeImage style={styles.imageInput} image = {catalog.show}/>
                      </TouchableOpacity>
                      <Modal visible={this.state.show}>
                      <Button title='Hide Description' onPress={()=>(this.setState({show:false}))}/>
                        <ScrollView> 
                          <ModalText show={catalog.show}/>
                          <ChangeImage style={styles.imageInput} image = {catalog.show}/>
                        </ScrollView>
                      </Modal>
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
   if(show.image.image!==null){return <><Image style={styles.imageInput} source={{uri:show.image.image.medium}}/></>}
   else{return <><Image style={styles.imageInput} source ={require('./image/myback.jpg')}/></>} 
}
export const ModalText = (show)=>{
    if(show.show.summary!==null){return <><Text style={styles.textModal}>{show.show.summary}</Text></>}
    else{return <><Text style={styles.textModal}>unavialable info</Text></>}
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
    paddingBottom:15
  },
  textModal:{
    fontSize:26,
    color:'black',
  },
  logotext:{
    fontSize:26,
    color:'#DBA901',
    paddingStart:140,
    paddingBottom:60,
    alignSelf:'flex-end',
  },
  imageInput:{
    height:500,
    width:'100%',
    alignSelf:'stretch'
  }
})


