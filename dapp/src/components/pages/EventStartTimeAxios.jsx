import React, { useEffect, useState } from "react";
import Text from "../basics/Text";
import { Box, Flex } from "@rebass/grid";
import { useAuthContext } from "../../contexts/AuthContext";
import { indexerEndpoint } from "../../config";
import axios from "axios";

export default function EventStartTime() {
  const { oracleContractReadOnly } = useAuthContext();
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    if (!oracleContractReadOnly) return;

    (async () => {
      const pricedata = [];
      const {
        data: { events },
      } = await axios.get(`${indexerEndpoint}/events/oracle/StartTimesPosted`);
      for (const event of events) {
        pricedata.push({
          time: Number(event.blockNumber),
          Epoch: Number(event.epoch),
          games: event.starttimes,
        });
      }
      setMatchHistory(pricedata);
    })();
  }, [oracleContractReadOnly]);

  if (Object.keys(matchHistory).length === 0)
    return (
      <Text size="20px" weight="200">
        Waiting...
      </Text>
    );
  else {
    return (
      <div>
        <Text size="20px">
          <a
            className="nav-header"
            style={{
              cursor: "pointer",
            }}
            href="/"
          >
            Back
          </a>
        </Text>
        <Box mt="15px" mx="30px">
          <Flex width="100%" justifyContent="marginLeft">
            <Text size="14px" weight="300">
              {" "}
              These event logs are created with every new epoch. Their order is
              consistent with the odds, results, and start time orders. Each
              item represents a match, and has the format
              "sport:homeTeam:awayTeam". Thus to validate the oracle, apply the
              most recent schedule data listed here to odds, results, and start
              times.
            </Text>
          </Flex>
        </Box>
        <br />
        <Text size="12px" weight="200">
          {" "}
          Time, Week, match0, match1, match2, match3, match4, match5, match6,
          match7, match8, match9, match10, match11, match2, match13, match14,
          match15, match16, match17, match18, match19, match20, match21,
          match22, match23, match24, match25, match26, match27, match28,
          match29, match30, match31
        </Text>{" "}
        <br />
        {matchHistory.map(
          (event) => (
            //            event.post1 && (
            <div>
              <Text size="12px" weight="200">
                {" "}
                {event.time}, {event.Epoch},{Number(event.games[0])} ,{" "}
                {Number(event.games[1])} , {Number(event.games[2])} ,
                {Number(event.games[3])} , {Number(event.games[4])} ,{" "}
                {Number(event.games[5])} ,{Number(event.games[6])} ,{" "}
                {Number(event.games[7])} , {Number(event.games[8])} ,
                {Number(event.games[9])} , {Number(event.games[10])} ,{" "}
                {Number(event.games[11])} ,{Number(event.games[12])} ,{" "}
                {Number(event.games[13])} , {Number(event.games[14])} ,
                {Number(event.games[15])} , {Number(event.games[16])} ,{" "}
                {Number(event.games[17])} ,{Number(event.games[18])} ,{" "}
                {Number(event.games[19])} , {Number(event.games[20])} ,
                {Number(event.games[21])} , {Number(event.games[22])} ,{" "}
                {Number(event.games[23])} ,{Number(event.games[24])} ,{" "}
                {Number(event.games[25])} , {Number(event.games[26])} ,
                {Number(event.games[27])} , {Number(event.games[28])} ,{" "}
                {Number(event.games[29])} ,{Number(event.games[30])} ,{" "}
                {Number(event.games[31])}
              </Text>
              <br />
            </div>
          )
          //        )
        )}
      </div>
    );
  }
}
