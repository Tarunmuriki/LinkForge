import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {api,unwrap} from "../../services/api";
import {Card,CardHeader,CardTitle,CardContent} from "../../components/ui/Card";
import {BarChart,Bar,Cell,LineChart,Line,PieChart,Pie,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";
import {BarChart3,CalendarDays,MousePointerClick,Smartphone,Globe2} from "lucide-react";

const ranges=[{label:"7 days",days:7},{label:"30 days",days:30},{label:"90 days",days:90}];
const colors=["#7c3aed","#db2777","#f59e0b","#0d9488"];
function startDate(days){return new Date(Date.now()-days*864e5).toISOString()}
function Metric({label,value,icon:Icon}){return <Card><CardContent className="flex items-center justify-between pt-5"><div><p className="text-sm text-zinc-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div><div className="grid size-11 place-items-center rounded-xl bg-violet-50 text-violet-600"><Icon size={20}/></div></CardContent></Card>}
function EmptyState({message="No data for this period yet."}){return <div className="grid h-full min-h-40 place-items-center rounded-xl border border-dashed border-zinc-200 text-sm text-zinc-500">{message}</div>}

export default function Analytics(){
 const [days,setDays]=useState(30);
 const query=useQuery({queryKey:["analytics",days],queryFn:async()=>{const params={from:startDate(days)};const [overview,clicks,devices,referrers]=await Promise.all([api.get("/analytics/overview",{params}),api.get("/analytics/clicks",{params}),api.get("/analytics/devices"),api.get("/analytics/referrers")]);return {overview:unwrap(overview),clicks:unwrap(clicks),devices:unwrap(devices),referrers:unwrap(referrers)}}});
 const data=query.data;
 const clickData=(data?.clicks||[]).map(item=>({date:item._id?.slice(5)||"",clicks:item.count}));
 const deviceData=data?.devices||[];
 const referrerData=data?.referrers||[];
 return <>
  <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-violet-600">Performance</p><h1 className="mt-1 text-3xl font-bold">Analytics</h1><p className="mt-1 text-sm text-zinc-500">Understand how your links are performing.</p></div><div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-1"><CalendarDays size={16} className="ml-2 text-zinc-400"/>{ranges.map(range=><button key={range.days} type="button" onClick={()=>setDays(range.days)} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${days===range.days?"bg-zinc-950 text-white":"text-zinc-500 hover:bg-zinc-100"}`}>{range.label}</button>)}</div></div>
  {query.isError&&<div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Analytics could not be loaded. Refresh and try again.</div>}
  <div className="grid gap-4 md:grid-cols-4"><Metric label="Clicks" value={(data?.overview?.clicks||0).toLocaleString()} icon={MousePointerClick}/><Metric label="Active links" value={(data?.overview?.links||0).toLocaleString()} icon={BarChart3}/><Metric label="Top device" value={deviceData[0]?._id||"—"} icon={Smartphone}/><Metric label="Top source" value={referrerData[0]?._id||"—"} icon={Globe2}/></div>
  <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]"><Card><CardHeader><CardTitle>Clicks over time</CardTitle></CardHeader><CardContent><div className="h-80">{query.isLoading?<div className="grid h-full place-items-center text-sm text-zinc-500">Loading analytics...</div>:clickData.length?<ResponsiveContainer width="100%" height="100%"><LineChart data={clickData}><XAxis dataKey="date" tickLine={false} axisLine={false}/><YAxis allowDecimals={false} tickLine={false} axisLine={false}/><Tooltip/><Line type="monotone" dataKey="clicks" stroke="#7c3aed" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer>:<EmptyState/>}</div></CardContent></Card><Card><CardHeader><CardTitle>Devices</CardTitle></CardHeader><CardContent><div className="h-80">{deviceData.length?<ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={deviceData} dataKey="count" nameKey="_id" innerRadius={65} outerRadius={100} paddingAngle={3}>{deviceData.map((item,index)=><Cell key={item._id} fill={colors[index%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer>:<EmptyState/>}</div><div className="mt-2 space-y-2">{deviceData.map((item,index)=><div className="flex items-center justify-between text-sm" key={item._id}><span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{backgroundColor:colors[index%colors.length]}}/>{item._id}</span><b>{item.count}</b></div>)}</div></CardContent></Card></div>
  <Card className="mt-5"><CardHeader><CardTitle>Top referrers</CardTitle></CardHeader><CardContent><div className="h-64">{referrerData.length?<ResponsiveContainer width="100%" height="100%"><BarChart data={referrerData} layout="vertical" margin={{left:20,right:20}}><XAxis type="number" allowDecimals={false} hide/><YAxis dataKey="_id" type="category" width={100} tickLine={false} axisLine={false}/><Tooltip/><Bar dataKey="count" fill="#db2777" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer>:<EmptyState/>}</div></CardContent></Card>
 </>
}
