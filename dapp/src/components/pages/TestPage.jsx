import React, { useState, useEffect } from "react";
import Split from "../layout/Split";
import { Box, Flex } from "@rebass/grid";
import Logo from "../basics/Logo";
import Text from "../basics/Text";
import { G } from "../basics/Colors";
import TruncatedAddress from "../basics/TruncatedAddress";
import VBackgroundCom from "../basics/VBackgroundCom";
import { useAuthContext } from "../../contexts/AuthContext";
import TeamTable from "../blocks/TeamTable2";
import { Link } from "react-router-dom";

function TestPage() {
  const {
    oracleContract,
    bettingContract,
    account,  } = useAuthContext();

  document.title = "Test Page";


  const [showDecimalOdds, setShowDecimalOdds] = useState(false);
  const [scheduleString, setScheduleString] = useState(
    Array(32).fill("check later...: n/a: n/a")
  );
  const [outcomes, setOutcomes] = useState([]);
  const [voteNo, setVoteNo] = useState("0");
  const [voteYes, setVoteYes] = useState("0");
  const [voteTracker, setVoteTracker] = useState("0");
  const [propNumber, setPropNumber] = useState("0");
  const [reviewStatus, setReviewStatus] = useState("0");
  const [currW4, setCurrW4] = useState("0");
  const [concentrationLimit, setConcentrationLimit] = useState("0");
  const [minSubmit, setMinSubmit] = useState("0");
  const [pause0, setPause0] = useState("0");
  const [pause1, setPause1] = useState("0");
  const [oddsVector, setOddsVector] = useState([]);
  const [proposer, setProposer] = useState("0x123");
  const [startTime, setStartTime] = useState([]);
  const [teamSplit, setTeamSplit] = useState([]);
  const [tokens, setTokens] = useState("0");

  useEffect(() => {
    if (!bettingContract || !oracleContract) return;
    const interval1 = setInterval(() => {
      findValues();
    }, 1000);
    return () => {
      clearInterval(interval1);
    };
  }, [bettingContract, oracleContract]);

 // findValues();

  function switchOdds() {
    setShowDecimalOdds(!showDecimalOdds);
  }

  async function voteNofn() {
    console.log(voteNo, "voteNo");
    let vote99 = false;
    await oracleContract.vote(vote99);
  }

  async function voteYesfn() {
    let vote99 = true;
    await oracleContract.vote(vote99);
  }

  async function findValues() {

    let _yesVotes = Number(await oracleContract.votes(0)) || "0";
    setVoteYes(_yesVotes);

    let _noVotes = Number(await oracleContract.votes(1)) || "0";
    setVoteNo(_noVotes);

    let _propNumber = Number(await oracleContract.propNumber()) || "0";
    setPropNumber(_propNumber);

    let _reviewStatus = Number(await oracleContract.reviewStatus()) || "0";
    setReviewStatus(_reviewStatus);

    let _startTimes = (await oracleContract.showPropStartTimes()) || [];
    setStartTime(_startTimes);

    let _oddsvector = (await oracleContract.showPropOdds()) || [];
    setOddsVector(_oddsvector);

    let _outcomes = (await oracleContract.showPropResults()) || [];
    setOutcomes(_outcomes);

    let _currW4 = Number((await bettingContract.params(0)) || 0);
    setCurrW4(_currW4);

    let _concentrationLimit = Number((await bettingContract.params(1)) || "0");
    setConcentrationLimit(_concentrationLimit);

    let _pause0 = Number((await bettingContract.paused(0)) || "0");
    setPause0(_pause0);

    let _pause1 = Number((await bettingContract.paused(1)) || "0");
    setPause1(_pause1);

    let _minSubmit = Number((await bettingContract.minSubmit()) || []);
    setMinSubmit(_minSubmit);

    let _proposer = (await oracleContract.proposer()) || "0x123";
    setProposer(_proposer);

    let oc = await oracleContract.adminStruct(account);

    let _voteTracker = oc ? oc.voteTracker.toString() : "0";
    setVoteTracker(_voteTracker);

    let _tokens = oc ? oc.tokens : "0";
    setTokens(_tokens);


    let sctring = await oracleContract.showSchedString();
    setScheduleString(sctring);
  }
// test
  function getMoneyLine(decOddsi) {
    let moneyline = 1;
    if (decOddsi < 1000) {
      moneyline = -1e5 / decOddsi;
    } else {
      moneyline = decOddsi / 10;
    }
    moneyline = moneyline.toFixed(0);
    if (moneyline > 0) {
      moneyline = "+" + moneyline;
    }
    return moneyline;
  }
//  
  let outhx = "1";

  function getOutcome(outcomei) {
    let outx = "lose";
    let outnum = Number(outcomei);
    if (outnum === 1) {
      outx = "win";
    } else if (outnum === 2) {
      outx = "tie";
    }
    return outx;
  }

  let statusWord = "nta";
  function reviewStatusWord(revStatusi) {
    statusWord = "na";
    if (revStatusi === 0) {
      statusWord = "init";
    } else if (revStatusi === 10) {
      statusWord = "process Initial";
    } else if (revStatusi === 20) {
      statusWord = "process update";
    } else if (revStatusi === 30) {
      statusWord = "process Settle";
    } else if (revStatusi === 2) {
      statusWord = "waiting for update or settlement";
    }
    return statusWord;
  }

  function needToVote(lastPropVote) {
    let needtovote = true;
    if (Number(lastPropVote) === Number(propNumber) || (Number(tokens) === 0)) {
      needtovote = false;
    } 
    return needtovote;
  }


  let [odds0, setOdds0] = useState([
    957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957,
    957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957,
    957, 957,
  ]);

  let [odds1, setOdds1] = useState([
    957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957,
    957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957, 957,
    957, 957,
  ]); 

  let odds999 = 0;

  useEffect(() => {
    for (let ii = 0; ii < 32; ii++) {
      if (oddsVector) odds999 = Number(oddsVector[ii]);
      odds0[ii] = odds999 || 0;
      odds1[ii] = Math.floor(1000000 / (odds999 + 50) - 1) || 0;
    }
  setOdds0(odds0);
  setOdds1(odds1);
}, []);


  let oddsTot = [odds0, odds1];

  useEffect(() => {
    let _teamSplit = scheduleString.map((s) => (s ? s.split(":") : undefined));
    setTeamSplit(_teamSplit);
  }, [scheduleString]);


  return (
    <div>
      <VBackgroundCom />
      <Split
        page={"betpage"}
        side={
          <Box mt="30px" ml="25px" mr="30px">
            <Logo />
            <Box>
              <Flex
                mt="20px"
                flexDirection="row"
                justifyContent="space-between"
              ></Flex>
              <Flex style={{ borderTop: `thin solid ${G}` }}></Flex>
            </Box>
            <Box>
              <Flex
                mt="20px"
                flexDirection="row"
                justifyContent="space-between"
              ></Flex>
            </Box>
            <Box>
              <Flex>
                <Text size="14px" color="#000">
                  <Link
                    className="nav-header"
                    style={{
                      cursor: "pointer",
                      color: "#fff000",
                      fontStyle: "italic",
                    }}
                    to="/bookiepage"
                  >
                    LP Page
                  </Link>
                </Text>
              </Flex>
            </Box>
            <Box>
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="marginLeft"
              >
                <Text size="14px">
                  <Link
                    className="nav-header"
                    style={{
                      cursor: "pointer",
                      color: "#fff000",
                      fontStyle: "italic",
                    }}
                    to="/"
                  >
                    HomePage
                  </Link>
                </Text>
              </Flex>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                Connected Account Address
              </Text>
              <TruncatedAddress
                addr={account}
                start="8"
                end="0"
                transform="uppercase"
                spacing="1px"
              />
            </Box>
            <Box>
              <Flex
                mt="5px"
                flexDirection="row"
                justifyContent="space-between"
              ></Flex>
            </Box>
            <Flex>
              <Box mt="1px" mb="1px" font="white">
                <button
                  style={{
                    backgroundColor: "black",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "yellow",
                    border: "1px solid #ffff00",
                    padding: "4px",
                    // width: width ? width : 120,
                    // color: "#00ff00",
                  }}
                  onClick={() => switchOdds()}
                >
                  {showDecimalOdds
                    ? "Switch to MoneyLine Odds"
                    : "Switch to Decimal Odds"}
                </button>{" "}
              </Box>
            </Flex>{" "}
            <Box>
              <Flex
                mt="20px"
                flexDirection="row"
                justifyContent="space-between"
              ></Flex>
             
              <Flex justifyContent="left">
                <Text size="14px" color="#ffffff">
                  Active Epoch: {currW4}
                </Text>
              </Flex>
              <Flex
                mt="10px"
                flexDirection="row"
                justifyContent="space-between"
              ></Flex>
            </Box>

            <Flex
              mt="5px"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              
              {needToVote(voteTracker) ? (
                <Box>
                <button
                  style={{
                    backgroundColor: "black",
                    borderRadius: "5px",
                    padding: "4px",
                    //borderRadius: "1px",
                    cursor: "pointer",
                    color: "yellow",
                    border: "1px solid #ffff00",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    voteNofn();
                  }}
                >
                  Vote No
                </button>
                <Text>" "</Text>
                <button
                  style={{
                    backgroundColor: "black",
                    borderRadius: "5px",
                    padding: "4px",
                    //borderRadius: "1px",
                    cursor: "pointer",
                    color: "yellow",
                    border: "1px solid #ffff00",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    voteYesfn();
                  }}
                >
                  Vote Yes
                </button>
                </Box>
              ) : <Text size="14px" className="style"> You Can't Vote</Text>}
              
            </Flex>
           
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                No Votes: {Number(voteNo)} Yes Votes: {Number(voteYes).toLocaleString()}
              </Text>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                Proposer: {proposer}
              </Text>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                ConcentrationLimit: {concentrationLimit} minSubmit: {minSubmit}
              </Text>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                PausedBets: {pause0} , {pause1}
              </Text>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                current Submission #: {propNumber}
              </Text>
            </Box>
            <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                Last Proposal Vote: {voteTracker}
              </Text>
            </Box>
          </Box>
        }
      >
        <Flex justifyContent="center">
          <Text size="25px" className="style">
            test Page{" "}
          </Text>
        </Flex>
        <Box mt="14px" mx="30px">
          <Flex width="100%" justifyContent="marginLeft">
            <Text size="14px" weight="300" className="style">
              {" "}
              shows data submitted by oracle token holder for vote
            </Text>
          </Flex>
        </Box>

        <Box mt="14px" mx="30px"></Box>

        <Flex
          mt="10px"
          pt="10px"
          alignItems="center"
          style={{
            borderTop: `thin solid ${G}`,
          }}
        ></Flex>
        <Box mb="10px" mt="10px">
              <Text size="14px" className="style">
                ReviewStatus: {reviewStatusWord(reviewStatus)}
              </Text>
            </Box>

        <Box>
          {" "}
          <Flex
            mt="20px"
            flexDirection="row"
            justifyContent="space-between"
          ></Flex>
        </Box>

        <Box>
          <Flex
            mt="20px"
            flexDirection="row"
            justifyContent="space-between"
          ></Flex>
        </Box>
        <div>
          <Box>
            {" "}
            <Flex>
              <TeamTable
                teamSplit={teamSplit}
                startTimeColumn={startTime}
                showDecimalOdds={showDecimalOdds}
                oddsTot={oddsTot}
                getMoneyLine={getMoneyLine}
                outcomev={outcomes}
                getOutcome={getOutcome}
                revStatus = {reviewStatus}
              />
            </Flex>{" "}
          </Box>
        </div>
      </Split>
    </div>
  );
}

export default TestPage;
