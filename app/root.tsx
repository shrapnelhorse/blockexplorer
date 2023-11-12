import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { useEffect, useState } from "react";
import type { Block, BlockTag } from "alchemy-sdk";
import { Alchemy, Network } from "alchemy-sdk";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const settings = {
  apiKey: "" /* TODO: add valid API KEY */,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function App() {
  const [blockNumber, setBlockNumber] = useState<number>();
  const [block, setBlock] = useState<Block>();

  useEffect(() => {
    const f = async () => {
      setBlockNumber(await alchemy.core.getBlockNumber());
    };
    f();
  });

  useEffect(() => {
    const f = async () => {
      setBlock(await alchemy.core.getBlock(blockNumber as BlockTag));
    };
    f();
  }, [blockNumber]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container max-w-screen-xl p-4">
          <h1 className="text-4xl">Block: {blockNumber}</h1>
          <table className="table-auto w-full text-sm my-4">
            <tbody className="bg-white dark:bg-slate-800">
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Hash:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.hash : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Parent Hash:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.parentHash : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Timestamp:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.timestamp : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Nonce:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.nonce : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Difficulty:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.difficulty : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Gas Limit:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.gasLimit.toNumber() : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Gas Used:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.gasUsed.toNumber() : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Miner:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.miner : ""}
                </td>
              </tr>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                  Transactions:
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {block != undefined ? block.transactions.length : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </main>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
