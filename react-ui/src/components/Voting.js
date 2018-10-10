import React, {Component} from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import {Card, Image, Icon, Modal, Form, TextArea} from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Rushee from "./Rushee";
import SearchRushee from "./SearchRushee";
import {getAll, getBids, sendBid} from "../scripts";

const standardButtons =  <div className='ui three buttons'>
                                <Button basic
                                onClick={()=>{
                                  this.handleApprove()
                                }}
                                  color='green'>
                                  Approve
                                </Button>
                                <Button basic
                                onClick={
                                    () =>{
                                      console.log("handling")
                                        this.handleAbstain()
                                    }
                                }
                                color='blue'>
                                  Abstain
                                </Button>
                                <Button basic color='red'
                                  onClick={()=>{
                                    this.handleReject()
                                  }}>
                                  Decline
                                </Button>
                              </div>


const noButtons = ""

const finalButtons = <div className='ui three buttons'>
                                <Button basic
                                onClick={()=>{
                                  this.handleApprove()
                                }}
                                  color='green'>
                                  Approve
                                </Button>
                                <Button basic color='red'
                                  onClick={()=>{
                                    this.handleReject()
                                  }}>
                                  Decline
                                </Button>
                              </div>


export default class Voting extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            thirdRound: [],
            secondRound: [],
            roundOne: [],
            bids: [],
            bidIds: [],
            approvedOrRejectedOrAbstained:false
        }
        this.refreshData = this.refreshData.bind(this)
        this.handleAbstain = this.handleAbstain.bind(this)
        this.compareBidsAndRows = this.compareBidsAndRows.bind(this)
        this.handleReject = this.handleReject.bind(this)
        this.handleApprove = this.handleApprove.bind(this)
        this.clearDate = this.clearData.bind(this)
        this.refreshData()
    }

    handleAbstain(pnm){
      console.log("HANDLING ABSTAIN")
      console.log(pnm)

      let obj = {
        'pnmid': pnm.pnmid,
        'status': 2, //abstained
        'round': pnm.round,
        'organizationid' : '123'

      }
      console.log(obj)
      sendBid(obj).then(res =>{
        console.log(res)
        this.clearData()

      })
    }

    handleApprove(pnm){
      console.log("HANDLING APPROVE")
      console.log(pnm)
      let obj = {
        'pnmid': pnm.pnmid,
        'status': 0, //abstained
        'round': pnm.round,
        'organizationid' : '123'

      }
      console.log(obj)
      sendBid(obj).then(res =>{
        console.log(res)
        this.clearData()
      })

    }
    handleReject(pnm){
      console.log("HANDLING REJECT")
      console.log(pnm)
      let obj = {
        'pnmid': pnm.pnmid,
        'status': 1, //abstained
        'round': pnm.round,
        'organizationid' : '123'

      }
      console.log(obj)
      sendBid(obj).then(res =>{
        console.log(res)
        this.clearData()

      })

    }

    // fetch all bids from db into state, forcing re-render
    refreshData() {
      console.log("DATA BEING DONE")
            getAll().then(res => {
                this.setState({rows: JSON.parse(res.getBody())}, ()=>{
                  getBids().then(res=>{
                    this.setState({bids: JSON.parse(res.getBody())}, ()=>{
                      this.compareBidsAndRows()
                    })
                  })
                })
            })

    }

    clearData() {

      this.setState({roundOne: []}, () => {
          this.setState({secondRound: []}, () => {
            this.setState({thirdRound: []}, () => {
              console.log("cleared 3")
              this.refreshData()
            })
          })

      })
    }
    //0 == give bid
    //1 == no bid
    //2 == abstain
    compareBidsAndRows(){
      console.log("Comparing")
      console.log(this.state.bids)
      this.state.rows.forEach(pnm =>{
        var bidIds = this.state.bidIds
        this.state.bids.forEach(bid=>{
            bidIds.push(bid.pnmid)
            this.setState({bidIds: bidIds})
            if(pnm.pnmid === bid.pnmid){

              if(bid.round === 1){
                if(bid.status === 2){ //abstain round 1
                            //push to round 1 no buttons and  2 with button

                  let nextRound = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": "white",
                      "round": 2,
                      "buttons": 1
                  }

                  var otherArray = this.state.secondRound;
                  otherArray.push(nextRound)
                  this.setState({secondRound: otherArray})



                }else if(bid.status === 1){ //No bid push to round 1 with no buttons
                  let rejected = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'red',
                      "round": 1,

                      "buttons": 0
                  }

                  var array = this.state.roundOne;
                  array.push(rejected)
                  this.setState({roundOne: array})
                }else if(bid.status == 0){
                  let accepted = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'green',
                      "round": 1,
                      "buttons": 0
                  }
                  var array = this.state.roundOne;
                  array.push(accepted)
                  this.setState({roundOne: array})

                }
              } else if(bid.round == 2) {

                if(bid.status === 2){ //abstain round 1
                                    //push to round 1 no buttons and  2 with button


                  let nextRound = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": "white",
                      "round": 3,
                      "buttons": 2
                  }



                  var otherArray = this.state.thirdRound
                  otherArray.push(nextRound)
                  this.setState({thirdRound: otherArray})


                }else if(bid.status === 1){ //No bid push to round 1 with no buttons
                  let rejected = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'red',
                      "round": 2,

                      "buttons": 0
                  }

                  var array = this.state.secondRound;
                  array.push(rejected)
                  this.setState({secondRound: array})
                }else if(bid.status == 0){
                  let accepted = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'green',
                      "round": 2,
                      "buttons": 0
                  }
                  var array = this.state.secondRound;
                  array.push(accepted)
                  this.setState({secondRound: array})

                }

              }  else if(bid.round == 3){
                 if(bid.status === 1){ //No bid, push to r3
                  let rejected = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'red',
                      "round": 3,

                      "buttons": 0
                  }
                  var array = this.state.thirdRound;
                  array.push(rejected)
                  this.setState({thirdRound: array})

                }else if(bid.status == 0){
                  let accepted = {
                    "name": pnm.name,
                      "pnmid": pnm.pnmid,
                      "description": pnm.description,
                      "photo" : pnm.photo,
                      "color": 'green',
                      "round": 3,
                      "buttons": 0
                  }
                  var array = this.state.thirdRound;
                  array.push(accepted)

                  this.setState({thirdRound: array})

                }


              }


            }
        })


      })
      var bidpnmids = []
      this.state.bids.forEach(bid=>{
          console.log(bid.pnmid)
          bidpnmids.push(bid.pnmid);


      })
      console.log(bidpnmids)
      var rowpnmids = []
      this.state.rows.forEach(row=>{
          console.log(row.pnmid)
          rowpnmids.push(row.pnmid);


      })
      console.log(rowpnmids)

    var intersection = rowpnmids.filter(x => !bidpnmids.includes(x));

    this.state.rows.forEach(pnm => {
        if(intersection.includes(pnm.pnmid)){

          let accepted = {
            "name": pnm.name,
              "pnmid": pnm.pnmid,
              "description": pnm.description,
              "photo" : pnm.photo,
              "color": 'green',
              "round": 1,
              "buttons": 1
          }
          var array = this.state.roundOne;
          array.push(accepted)

          this.setState({roundOne: array})
        }


    })
}




    render(){
        return (
            <Container id={"ContainerDiv"} className={"ContainerDiv"}>
                <Grid doubling columns={3} padded>
                    <Grid.Column>
                        <SearchRushee />
                        <Card.Group>
                        {this.state.roundOne.map(pnm => {

                          if(pnm.buttons === 1){
                              var buttons = <div className='ui three buttons'>
                                                              <Button basic
                                                              onClick={()=>{
                                                                this.handleApprove(pnm)
                                                              }}
                                                                color='green'>
                                                                Approve
                                                              </Button>
                                                              <Button basic
                                                              onClick={
                                                                  () =>{
                                                                    console.log("handling")
                                                                      this.handleAbstain(pnm)
                                                                  }
                                                              }
                                                              color='blue'>
                                                                Abstain
                                                              </Button>
                                                              <Button basic color='red'
                                                                onClick={()=>{
                                                                  this.handleReject(pnm)
                                                                }}>
                                                                Decline
                                                              </Button>
                                                            </div>

                          }else if(pnm.buttons === 2){
                              var buttons = <div className='ui three buttons'>
                                                              <Button basic
                                                              onClick={()=>{
                                                                this.handleApprove(pnm)
                                                              }}
                                                                color='green'>
                                                                Approve
                                                              </Button>
                                                              <Button basic color='red'
                                                                onClick={()=>{
                                                                  this.handleReject(pnm)
                                                                }}>
                                                                Decline
                                                              </Button>
                                                            </div>
                          }else{
                            var buttons =""
                          }
                            return <Card color={pnm.color}>
                            <Card.Content color={pnm.color}>
                              <Image floated='right' size='mini' src={pnm.photo} />
                              <Card.Header>{pnm.name}</Card.Header>

                              <Card.Description>
                                {pnm.description}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              {buttons}
                            </Card.Content>
                          </Card>
                        })}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <SearchRushee />
                        <Card.Group>
                        {this.state.secondRound.map(pnm => {
                            if(pnm.buttons === 1){
                                var buttons = <div className='ui three buttons'>
                                                                <Button basic
                                                                onClick={()=>{
                                                                  this.handleApprove(pnm)
                                                                }}
                                                                  color='green'>
                                                                  Approve
                                                                </Button>
                                                                <Button basic
                                                                onClick={
                                                                    () =>{
                                                                      console.log("handling")
                                                                        this.handleAbstain(pnm)
                                                                    }
                                                                }
                                                                color='blue'>
                                                                  Abstain
                                                                </Button>
                                                                <Button basic color='red'
                                                                  onClick={()=>{
                                                                    this.handleReject(pnm)
                                                                  }}>
                                                                  Decline
                                                                </Button>
                                                              </div>

                            }else if(pnm.buttons === 2){
                                var buttons = <div className='ui three buttons'>
                                                                <Button basic
                                                                onClick={()=>{
                                                                  this.handleApprove(pnm)
                                                                }}
                                                                  color='green'>
                                                                  Approve
                                                                </Button>
                                                                <Button basic color='red'
                                                                  onClick={()=>{
                                                                    this.handleReject(pnm)
                                                                  }}>
                                                                  Decline
                                                                </Button>
                                                              </div>
                            }else{
                              var buttons =""
                            }
                            return <Card color={pnm.color}>
                            <Card.Content color={pnm.color}>
                              <Image floated='right' size='mini' src={pnm.photo} />
                              <Card.Header>{pnm.name}</Card.Header>

                              <Card.Description>
                                {pnm.description}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              {buttons}

                            </Card.Content>
                          </Card>
                        })}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <SearchRushee />
                        <Card.Group>
                        {this.state.thirdRound.map(pnm => {
                            if(pnm.buttons === 1){
                                var buttons = <div className='ui three buttons'>
                                                                <Button basic
                                                                onClick={()=>{
                                                                  this.handleApprove(pnm)
                                                                }}
                                                                  color='green'>
                                                                  Approve
                                                                </Button>
                                                                <Button basic
                                                                onClick={
                                                                    () =>{
                                                                      console.log("handling")
                                                                        this.handleAbstain(pnm)
                                                                    }
                                                                }
                                                                color='blue'>
                                                                  Abstain
                                                                </Button>
                                                                <Button basic color='red'
                                                                  onClick={()=>{
                                                                    this.handleReject(pnm)
                                                                  }}>
                                                                  Decline
                                                                </Button>
                                                              </div>

                            }else if(pnm.buttons === 2){
                                var buttons = <div className='ui three buttons'>
                                                                <Button basic
                                                                onClick={()=>{
                                                                  this.handleApprove(pnm)
                                                                }}
                                                                  color='green'>
                                                                  Approve
                                                                </Button>
                                                                <Button basic color='red'
                                                                  onClick={()=>{
                                                                    this.handleReject(pnm)
                                                                  }}>
                                                                  Decline
                                                                </Button>
                                                              </div>
                            }else{
                              var buttons =""
                            }
                            return <Card color={pnm.color}>
                            <Card.Content color={pnm.color}>
                              <Image floated='right' size='mini' src={pnm.photo} />
                              <Card.Header>{pnm.name}</Card.Header>

                              <Card.Description>
                                {pnm.description}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            {buttons}

                            </Card.Content>
                          </Card>
                        })}
                        </Card.Group>
                    </Grid.Column>

                </Grid>
                <Button positive>Save Round Results</Button>
            </Container>
        )
    }
}
