// Last modified  23:38 7.3.2004
// Àuthors Nikolai Valtchanov and Nikola Borisov

var doc, time0, paused_flag=0, pause_start=0,
	curr_cmd = null, last_menu=null, menuon=false, 
	mnf = 1, movedn = null, 	// move node flag
	aef = 1, c1 = null, 		// add edge flag
	nodes, edges,
	algo=false,				// true if algo is on else false
	ors,
	savetn = null,
	begin, dfs_cnt, fake_edge,
	dir_mode = false;			// true for directed graph mode
	path_edges = 0;			// all edges int the edges array after path_edges are twisted
	geomet = false;				 // true if in geometry mode(no edges)

var
	ACTIVE="lightskyblue", VISITED="mediumblue", DEFINED="limegreen", START="red",
	EACTIVE="goldenrod", EVISITED="teal", EDEF="forestgreen", ESTART="black", ETREE="red",
	objects,
	anim;
	
var CLRSLIST, x;

// Global var for Nikolai Valtchanov
var visited, postnum, comp, prenum, low, curr, rt_reached, rtsubt;

// Global var for Nikola Borisof
var is_flow=0, start_p, start_p_txt, end_p, end_p_txt, bul=1;
var used_dfs, flow, edgeslen, edgetxt, els, begin_dfs, dur1_dfs=3, max_flow=0;

function init (evt) {
	var g, tn;
	doc = evt.getTarget().getOwnerDocument();

	time0 = (new Date()).valueOf();
	nodes = new Array;
	edges = new Array;
	visited = new Array;
	prenum = new Array;
	postnum = new Array;
	low = new Array;
	anim = new Array;
	objects = new Array;
	fake_edge = new Array;

	tn = doc.getElementById("taskbar");
	for (tn = tn.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
	tn.firstChild.data = "Constructing graph";
	
	CLRSLIST = new Array; x = 0;
	
  CLRSLIST[x++] = "rgb( 0, 0, 255)";
	CLRSLIST[x++] = "rgb(165, 42, 42)";
	CLRSLIST[x++] = "rgb(222, 184, 135)";
	CLRSLIST[x++] = "rgb( 95, 158, 160)";
	CLRSLIST[x++] = "rgb(127, 255, 0)";
	CLRSLIST[x++] = "rgb(210, 105, 30)";
	CLRSLIST[x++] = "rgb(255, 127, 80)";
	CLRSLIST[x++] = "rgb(100, 149, 237)";
	CLRSLIST[x++] = "rgb(255, 248, 220)";
	CLRSLIST[x++] = "rgb(220, 20, 60)";
	CLRSLIST[x++] = "rgb( 0, 255, 255)";
	CLRSLIST[x++] = "rgb( 0, 0, 139)";
	CLRSLIST[x++] = "rgb( 0, 139, 139)";
	CLRSLIST[x++] = "rgb(184, 134, 11)";
	CLRSLIST[x++] = "rgb( 0, 100, 0)";
	CLRSLIST[x++] = "rgb(169, 169, 169)";
	CLRSLIST[x++] = "rgb(189, 183, 107)";
	CLRSLIST[x++] = "rgb(139, 0, 139)";
	CLRSLIST[x++] = "rgb( 85, 107, 47)";
	CLRSLIST[x++] = "rgb(255, 140, 0)";
	CLRSLIST[x++] = "rgb(153, 50, 204)";
	CLRSLIST[x++] = "rgb(139, 0, 0)";
	CLRSLIST[x++] = "rgb(233, 150, 122)";
	CLRSLIST[x++] = "rgb(143, 188, 143)";
	CLRSLIST[x++] = "rgb( 72, 61, 139)";
	CLRSLIST[x++] = "rgb( 47, 79, 79)";
	CLRSLIST[x++] = "rgb( 47, 79, 79)";
	CLRSLIST[x++] = "rgb( 0, 206, 209)";
	CLRSLIST[x++] = "rgb(148, 0, 211)";
	CLRSLIST[x++] = "rgb(255, 20, 147)";
	CLRSLIST[x++] = "rgb( 0, 191, 255)";
	CLRSLIST[x++] = "rgb(105, 105, 105)";
	CLRSLIST[x++] = "rgb( 30, 144, 255)";
	CLRSLIST[x++] = "rgb(178, 34, 34)";
	CLRSLIST[x++] = "rgb(255, 250, 240)";
	CLRSLIST[x++] = "rgb( 34, 139, 34)";
	CLRSLIST[x++] = "rgb(255, 0, 255)";
	CLRSLIST[x++] = "rgb(220, 220, 220)";
	CLRSLIST[x++] = "rgb(248, 248, 255)";
	CLRSLIST[x++] = "rgb(255, 215, 0)";
	CLRSLIST[x++] = "rgb(218, 165, 32)";
	CLRSLIST[x++] = "rgb(128, 128, 128)";
	CLRSLIST[x++] = "rgb( 0, 128, 0)";
	CLRSLIST[x++] = "rgb(173, 255, 47)";
	CLRSLIST[x++] = "rgb(240, 255, 240)";
	CLRSLIST[x++] = "rgb(255, 105, 180)";
	CLRSLIST[x++] = "rgb(205, 92, 92)";
	CLRSLIST[x++] = "rgb( 75, 0, 130)";
	CLRSLIST[x++] = "rgb(255, 255, 240)";
	CLRSLIST[x++] = "rgb(240, 230, 140)";
	CLRSLIST[x++] = "rgb(230, 230, 250)";
	CLRSLIST[x++] = "rgb(255, 240, 245)";
	CLRSLIST[x++] = "rgb(124, 252, 0)";
	CLRSLIST[x++] = "rgb(255, 250, 205)";
	CLRSLIST[x++] = "rgb(173, 216, 230)";
	CLRSLIST[x++] = "rgb(240, 128, 128)";
	CLRSLIST[x++] = "rgb(224, 255, 255)";
	CLRSLIST[x++] = "rgb(250, 250, 210)";
	CLRSLIST[x++] = "rgb(211, 211, 211)";
	CLRSLIST[x++] = "rgb(144, 238, 144)";
	CLRSLIST[x++] = "rgb(135, 206, 235)" 
	CLRSLIST[x++] = "rgb(106, 90, 205)"
	CLRSLIST[x++] = "rgb(112, 128, 144)"
	CLRSLIST[x++] = "rgb(255, 250, 250)"
	CLRSLIST[x++] = "rgb( 0, 255, 127)"
	CLRSLIST[x++] = "rgb( 70, 130, 180)"
	CLRSLIST[x++] = "rgb(210, 180, 140)"
	CLRSLIST[x++] = "rgb( 0, 128, 128)"
	CLRSLIST[x++] = "rgb(216, 191, 216)" 
	CLRSLIST[x++] = "rgb(255, 99, 71)"
	CLRSLIST[x++] = "rgb( 64, 224, 208)"
	CLRSLIST[x++] = "rgb(238, 130, 238)"
	CLRSLIST[x++] = "rgb(245, 222, 179)"
	CLRSLIST[x++] = "rgb(255, 255, 255)"
	CLRSLIST[x++] = "rgb(245, 245, 245)"
	CLRSLIST[x++] = "rgb(255, 255, 0)"
	CLRSLIST[x++] = "rgb(154, 205, 50)"
}

/* MENU FUNCTIONS */
function menu_click (evt) {
		var cmd = evt.target, group, co, button, buf, tn, begin;
		var new_cmd;
				
	buf = cmd.getParentNode();
	new_cmd = buf.getAttribute("id");

	co = cmd.getParentNode();

 	if (new_cmd == "pause_b") {
		if (algo) pause();	
		return;	
	}
 	if (new_cmd == "reload_b") {
		if (paused_flag) pause();	 
		refresh();	
		return;	
	}	
	
	if (curr_cmd != null && curr_cmd != new_cmd) return;
	
	if (new_cmd == "dir_mode_b") { change_dir(co);	return;	}
 	if (new_cmd == "geometry_b") { geometry(co);	return;	}
	
	if ( geomet==true && (new_cmd!="add_node_b" && new_cmd!="delete_node_b" && new_cmd!="move_node_b" ) ) return; 		

	
	if (curr_cmd == new_cmd) {
		if (curr_cmd == "move_node_b" && mnf == 2) {
			paint_node(movedn);
			mnf = 1;
		} else if (curr_cmd == "add_edge_b" && aef == 2) {
			paint_node(c1);
			aef = 1;	
		}
		
		group = doc.getElementById("menu").childNodes;
		for (i = 0; i < group.length; i++) {
			if (group.item(i).nodeName == "g")
				group.item(i).setAttribute("opacity","1");	
		}				

		// disable pause
		doc.getElementById("pause_b").setAttribute("opacity","0.5");
		// disable non-geometric buttons
		if (geomet) {
			doc.getElementById("add_edge_b").setAttribute("opacity","0.5");
			doc.getElementById("delete_edge_b").setAttribute("opacity","0.5");
			doc.getElementById("dir_mode_b").setAttribute("opacity","0.5");
		}
		
		for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
		tn.firstChild.data = ors;
		curr_cmd = null;
		
		// button restores itself
		for (tn = co.firstChild; tn.nodeName != "rect"; tn = tn.nextSibling) ;
		tn.setAttribute("stroke","url(#gr_normal)");
		
		bar("Constructing graph");
	} else {
		if (nodes.length < 2 && 
				(new_cmd == "add_edge_b" || new_cmd == "delete_edge_b")) return;
		if (edges.length == 0 && new_cmd == "delete_edge_b") return;
		if (nodes.length == 0 && 
				(new_cmd == "delete_node_b" || new_cmd == "move_node_b")) return;
	
		group = doc.getElementById("menu").childNodes;
		
		for (i = 0; i < group.length; i++) {
			if (group.item(i).nodeName == "g")
				group.item(i).setAttribute("opacity","0.5");	
		}
		co.setAttribute("opacity","1");
		
		// button falls through
		for (tn = co.firstChild; tn.nodeName != "rect"; tn = tn.nextSibling) ;
		tn.setAttribute("stroke","url(#gr_click)");

		for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
		ors = tn.firstChild.data;
		tn.firstChild.data="STOP";
		curr_cmd = new_cmd;
					
		bar("Command - " + ors);
	}
}

function algo_menu_click (evt) {	
		var cmd = evt.target, an, co, tn, new_cmd, menug,s;
	
	for (co = cmd.getParentNode(); co.nodeName != "g"; co = co.getParentNode()) ;
	new_cmd = co.getAttribute("id");
	
	menug = co.getParentNode().getAttribute("id");

	if (menug == "algo_menu" && new_cmd != "algos_b") {
		if (paused_flag) pause();
			
		last_menu = new_cmd.slice(0,-1)+"svg";
		animate(doc.getElementById(last_menu),"XML","x","100%","80%",((new Date()).valueOf() - time0)/1000,0.3,1);
		menuon = true;		
	}	else if (menug != "algo_menu" && new_cmd.slice(0,4) == "hide" ) {
		if (paused_flag) pause();
	
		animate(doc.getElementById(last_menu),"XML","x","80%","100%",((new Date()).valueOf() - time0)/1000,0.3,1);
		
		// button restores
		if (savetn != null) savetn.setAttribute("stroke","url(#gr_normal)");
		
		curr_cmd = null;
		menuon = false;
		
		bar("Choose an algorithm");
	}	else if (new_cmd != "algos_b") {
		if (paused_flag) return;
		curr_cmd = new_cmd;
		for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
		ors = tn.firstChild.data;
		
		type = co.getAttribute("class");
		s = "Use the CONSTRUCT MENU'S last two buttons above the RELOAD button to choose environment modes: GEOMETRY/DIRECTED GRAPH/UNDIRECTED GRAPH";
		
		if (geomet) {
			if (type != "geo") {
				if (type == "both") alert("This algorithm applis to graphs. "+s);
				if (type == "dir") alert("This algorithm applis to DIRECTED graphs only. "+s);
				if (type == "undir") alert("This algorithm applis to UNDIRECTED graphs only. "+s);				
				return;
			}
		} else {
			if (type == "geo") { alert("This is a geometrical algorithm. "+s); return; }
			if (!dir_mode && type == "dir") { alert("This algorithm applis to DIRECTED graphs only. "+s); return; }
			if (dir_mode && type == "undir") { alert("This algorithm applis to UNDIRECTED graphs only. "+s); return; }
		} 
		
		// button restores
		if (savetn != null) savetn.setAttribute("stroke","url(#gr_normal)");
		
		// button falls through
		for (tn = co.firstChild; tn.nodeName != "rect"; tn = tn.nextSibling) ;
		tn.setAttribute("stroke","url(#gr_click)");
		savetn = tn;
		
		if (curr_cmd == "euler_b") {
			bar("Running " + ors);
			Oiler(evt);
		} else if (curr_cmd == "mst2_b") {
			bar("Running " + ors);
			mst2(evt);
		} else if (curr_cmd == "jarvis_b") {
			bar("Running " + ors);		
			jarvis(evt);
		} else if (curr_cmd == "graham_b") {
			bar("Running " + ors);		
			graham(evt);
		} else if (curr_cmd == "dom_b")	{
			bar("Running " + ors);		
			dom(evt);
		} else if (curr_cmd == "codom_b") {
			bar("Running " + ors);		
			co_dom(evt);
		} else if (curr_cmd == "scc_b") {
			bar("Running " + ors);		
			scc();			
		} else if (curr_cmd == "bfs_b" || curr_cmd == "dfs_b" || curr_cmd == "ap_b" ||
			curr_cmd == "bridges_b" || curr_cmd == "mst_b" || curr_cmd == "dijkstra_b")
				bar("Pick a starting vertex.");
	} else if (algo) {
			if (paused_flag) pause();
			// disable pause
			doc.getElementById("pause_b").setAttribute("opacity","0.5");
			refresh();
	
			animate(doc.getElementById("algo_svg"),"XML","y","0%","-64.5%",((new Date()).valueOf() - time0)/1000,0.5,1);			
			
			for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
			tn.firstChild.data = "algorithms";
			
			if (savetn != null)	savetn.setAttribute("stroke","url(#gr_normal)");
			savetn = null;
						
			
			curr_cmd = null;
			new_cmd = null;
			algo = false;
			bar("Constructing graph");
	} else if (curr_cmd == null) {
			animate(doc.getElementById("algo_svg"),"XML","y","-64.5%","0%",((new Date()).valueOf() - time0)/1000,0.5,1);
			
			for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
			tn.firstChild.data = "construct";
			
			// enable pause
			doc.getElementById("pause_b").setAttribute("opacity","1");
			
			curr_cmd = null;
			algo = true;
			bar("Choose an algorithm");
	}
}

function work_click (evt) { 
	if (curr_cmd == "add_node_b") add_node();
	if (curr_cmd == "move_node_b" && mnf == 2 ) move_node(null);
}

function pause (evt) {
	if (paused_flag == 0) {
		pause_start = (new Date()).valueOf();	
		doc.rootElement.pauseAnimations();
		doc.getElementById("pause_b_text").firstChild.data = "unpause";
		paused_flag = 1;
	}	else {
		doc.rootElement.unpauseAnimations();
		doc.getElementById("pause_b_text").firstChild.data = "pause";		
		paused_flag = 0;
		time0 += ((new Date()).valueOf()-pause_start);
	}
}

// Changes the direction of the graph
function change_dir(co)	{	
	var n1, n2, l, newl, f, r1, x1, x2, y1, y2, i, j, gx, gy, d, mx, my, sina, sinb,
		wei, len, rect;

	for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;

	if ( dir_mode==false )	{
		if ( bul==1 )
 		tn.firstChild.data="undir. graph";
		path_edges = edges.length;
		for ( i=0 ; i<path_edges ; i++ )	{
			edges[i].gi.setAttribute("marker-end","url(#arrow)");
			n1 = edges[i].n1;
			n2 = edges[i].n2;
			for ( j=0 ; j<nodes[n2].elist.length ; j++ )	{
				if ( nodes[n2].elist[j]==i )	{
					// memmove
					nodes[n2].elist[j] = nodes[n2].elist[nodes[n2].elist.length-1];
					nodes[n2].elist.pop();
					// adds it to the relist
					nodes[n2].relist.push(i);
					break;
				}
			}
			
  		x1 = parseInt(nodes[n2].gi.getAttribute("cx"));
  		y1 = parseInt(nodes[n2].gi.getAttribute("cy")); 
  		x2 = parseInt(nodes[n1].gi.getAttribute("cx"));
  		y2 = parseInt(nodes[n1].gi.getAttribute("cy"));

			f = Math.atan2(y2-y1,x2-x1);
			f = f*180/3.1415725;

			d = 35;
			mx = (x1+x2)/2;
  		my = (y1+y2)/2;

			sina = (y2-y1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
			cosa = (x2-x1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
			gx = mx + sina*d; 
			gy = my - cosa*d;
			r1 = ((x1-gx)*(x1-gx)+(y1-gy)*(y1-gy))/(2*d);
			
			newl = doc.createElement("path");			
	  	newl.setAttribute("d","M"+x1.toString(10)+","+y1.toString(10)+" A"+r1.toString(10)+","+r1.toString(10)+" "+f.toString(10)+" 0,1 "+x2.toString(10)+","+y2.toString(10));
  		newl.setAttribute("stroke","black"); 
  		newl.setAttribute("stroke-width","4");
			newl.setAttribute("fill","none");
			newl.setAttribute("marker-end","url(#arrow)");
  		doc.getElementById("edges").appendChild(newl);
  		  		
  		// background of weight
  		rect = doc.createElement("rect");
  		rect.setAttribute("fill","green");
  		rect.setAttribute("opacity","0.4");
  		rect.setAttribute("x",(gx-20).toString(10));
  		rect.setAttribute("y",(gy-16).toString(10));
  		rect.setAttribute("width","40");
  		rect.setAttribute("height","22");
  		rect.setAttribute("id","bg"+edges.length.toString(10));
  		doc.getElementById("edge_weights").appendChild(rect);
			
  		len = edges[i].wei;
  		wei = doc.createElement("text");
  		wei.setAttribute("id","patt"+edges.length.toString(10));
  		wei.setAttribute("font-size","16px");
  		wei.setAttribute("text-anchor","middle");
  		wei.setAttribute("font-weight","bold");
  		wei.setAttribute("stroke","black");
  		wei.setAttribute("stroke-width","0");
  		wei.setAttribute("fill","white");
  		wei.setAttribute("x",gx.toString(10));
  		wei.setAttribute("y",gy.toString(10));
  		wei.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
  		wei.firstChild.data = len.toString(10);
  		doc.getElementById("edge_weights").appendChild(wei);
			
			// adds to array
			edges.push({gi:newl, n1:n2, n2:n1, wei:len, weigi:wei, rectgi:rect});
			nodes[n2].elist.push(edges.length-1);
			nodes[n1].relist.push(edges.length-1);
		}
		dir_mode = true;
	} else {

 		tn.firstChild.data="dir. graph. mode";
		for ( i=0 ; i<path_edges ; i++ ) {
				edges[i].gi.setAttribute("marker-end","");
				n1 = edges[i].n1;
				n2 = edges[i].n2;
				for ( j=0 ; j<nodes[n2].relist.length && nodes[n2].relist[j]!=i ; j++ );
				nodes[n2].elist.push(i);
				// memmove
				nodes[n2].relist[j] = nodes[n2].relist[nodes[n2].relist.length-1];
				nodes[n2].relist.pop();
		}
		for ( i=path_edges ; i<edges.length ; i++ )	{	
			delete_edge(edges[i].gi);
			i--;
		}
		dir_mode = false;
		path_edges = edges.length;
	}
}

function geometry(co)	{
		var i,j,tn;
		
 		for (tn = co.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
		
		if ( geomet==false )	{
     	tn.firstChild.data="graph mode";
			
			doc.getElementById("edges").setAttribute("visibility","hidden");
			doc.getElementById("edge_weights").setAttribute("visibility","hidden");
			
			doc.getElementById("add_edge_b").setAttribute("opacity","0.5");
			doc.getElementById("delete_edge_b").setAttribute("opacity","0.5");
			doc.getElementById("dir_mode_b").setAttribute("opacity","0.5");								
			
			geomet=true;
		} else {
   		tn.firstChild.data="geometry mode";
			
			doc.getElementById("edges").setAttribute("visibility","visible");
			doc.getElementById("edge_weights").setAttribute("visibility","visible");
			
			doc.getElementById("add_edge_b").setAttribute("opacity","1");
			doc.getElementById("delete_edge_b").setAttribute("opacity","1");
			doc.getElementById("dir_mode_b").setAttribute("opacity","1");								
			
			geomet=false;
		}
}

function drift (evt) {
	var pos,i,k,e,x1,x2,y1,y2, sina, cosa, f, d, mx, my, gx, gy, r1;
 
	if (mnf == 2)	{
			pos = getcoords();
			movedn.setAttribute("cx",pos.x);
			movedn.setAttribute("cy",pos.y);

			// connected edges
			for (i = 0; nodes[i].gi != movedn; i++) ;
			for (k = 0; k < nodes[i].elist.length; k++) {
				if ( nodes[i].elist[k] >= path_edges )			{

					e = edges[nodes[i].elist[k]];
  				x1 = pos.x; 
      		y1 = pos.y;  
      		x2 = nodes[e.n2].gi.getAttribute("cx");
      		y2 = nodes[e.n2].gi.getAttribute("cy");
  				
  				f = Math.atan2(y2-y1,x2-x1);
    			f = f*180/3.1415725;

    			d = 35; 	
					mx = (parseInt(x1)+parseInt(x2))/2;
        	my = (parseInt(y1)+parseInt(y2))/2;
    
    			sina = (y2-y1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    			cosa = (x2-x1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    			gx = mx + sina*d; 
    			gy = my - cosa*d;
    			r1 = ((x1-gx)*(x1-gx)+(y1-gy)*(y1-gy))/(2*d);
  				s = "M"+x1.toString(10)+","+y1.toString(10)+" A"+r1.toString(10)+","+r1.toString(10)+" "+f.toString(10)+" 0,1 "+x2.toString(10)+","+y2.toString(10);
  				e.gi.setAttribute("d",s);
					e.weigi.setAttribute("x",gx.toString(10));
  				e.weigi.setAttribute("y",gy.toString(10));
  				e.rectgi.setAttribute("x",(gx-20).toString(10));
  				e.rectgi.setAttribute("y",(gy-16).toString(10));
					
				} else {
  				e = edges[nodes[i].elist[k]];
  				if ( e.n1==i )	{
  					s = "M"+pos.x.toString(10)+","+pos.y.toString(10)+" L"+nodes[e.n2].gi.getAttribute("cx")+","+nodes[e.n2].gi.getAttribute("cy");
  					e.gi.setAttribute("d",s);
        		} else {
  					s = "M"+nodes[e.n1].gi.getAttribute("cx")+","+nodes[e.n1].gi.getAttribute("cy")+" L"+pos.x.toString(10)+","+pos.y.toString(10);
  					e.gi.setAttribute("d",s);				
        		}
  				x1 = parseInt(nodes[e.n1].gi.getAttribute("cx"));
  				y1 = parseInt(nodes[e.n1].gi.getAttribute("cy"));
  				x2 = parseInt(nodes[e.n2].gi.getAttribute("cx"));
  				y2 = parseInt(nodes[e.n2].gi.getAttribute("cy"));
  				e.weigi.setAttribute("x",((x1+x2)/2).toString(10));
  				e.weigi.setAttribute("y",((y1+y2)/2).toString(10));
  				e.rectgi.setAttribute("x",((x1+x2)/2-20).toString(10));
  				e.rectgi.setAttribute("y",((y1+y2)/2-16).toString(10));
				}	
			}
			for (k = 0; k < nodes[i].relist.length; k++) {
					if ( nodes[i].relist[k]>=path_edges )		 {
						e = edges[nodes[i].relist[k]];
    				x1 = nodes[e.n1].gi.getAttribute("cx");
        		y1 = nodes[e.n1].gi.getAttribute("cy"); 
        		x2 = pos.x;
        		y2 = pos.y;
    				
    				f = Math.atan2(y2-y1,x2-x1);
      			f = f*180/3.1415725;

      			d = 35;
    	 			mx = (parseInt(x1)+parseInt(x2))/2;
        		my = (parseInt(y1)+parseInt(y2))/2;
      
      			sina = (y2-y1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
      			cosa = (x2-x1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
      			gx = mx + sina*d; 
      			gy = my - cosa*d;
      			r1 = ((x1-gx)*(x1-gx)+(y1-gy)*(y1-gy))/(2*d);
    				s = "M"+x1.toString(10)+","+y1.toString(10)+" A"+r1.toString(10)+","+r1.toString(10)+" "+f.toString(10)+" 0,1 "+pos.x.toString(10)+","+pos.y.toString(10);
    				e.gi.setAttribute("d",s);				
    							
    				e.weigi.setAttribute("x",gx.toString(10));
    				e.weigi.setAttribute("y",gy.toString(10));
    				e.rectgi.setAttribute("x",(gx-20).toString(10));
    				e.rectgi.setAttribute("y",(gy-16).toString(10));
					
					} else {

    				e = edges[nodes[i].relist[k]];
    				s = "M"+nodes[e.n1].gi.getAttribute("cx")+","+nodes[e.n1].gi.getAttribute("cy")+" L"+pos.x.toString(10)+","+pos.y.toString(10);
     				e.gi.setAttribute("d",s);				
    				
     				x1 = parseInt(nodes[e.n1].gi.getAttribute("cx"));
    				y1 = parseInt(nodes[e.n1].gi.getAttribute("cy"));
    				x2 = parseInt(nodes[e.n2].gi.getAttribute("cx"));
    				y2 = parseInt(nodes[e.n2].gi.getAttribute("cy"));
						mx = (x1+x2)/2;
						my = (y1+y2)/2;
    				e.weigi.setAttribute("x",mx.toString(10));
    				e.weigi.setAttribute("y",my.toString(10));
    				e.rectgi.setAttribute("x",(mx-20).toString(10));
    				e.rectgi.setAttribute("y",(my-16).toString(10));
				}	
			}			
	}
}

/* ANIMATION FUNCTIONS */
function anm_motion (c, from, to, begin, dur, dir) {
	var i,a,s,p,x1,x2,y1,y2,gx,gy,r1,r2,f,eix;
	if ( dir_mode==false ) {
		 	for ( i=0 ; i<edges.length && !(edges[i].n1==from && edges[i].n2==to) ; i++ );
			if ( i!=edges.length )
				 	eix = i;
			else {
					 for ( i=0 ; i<edges.length && !(edges[i].n2==from && edges[i].n1==to) ; i++ );
					 eix = i;
					 dir = !dir;
			}
	} else {
			for ( i=0 ; i<edges.length && !(edges[i].n1==from && edges[i].n2==to) ; i++ );
			eix = i;
	}
	
	a = doc.createElement("animateMotion");
	a.setAttribute("attributeType","XML");
	a.setAttribute("begin",begin.toString(10));
	a.setAttribute("dur",dur.toString(10));

	if (!dir)	a.setAttribute("path",edges[eix].gi.getAttribute("d"));
	else { 
			s = (new String(edges[eix].gi.getAttribute("d"))).split(" ");

			if (eix < path_edges) {
				 s[0] = s[0].slice(1);
				 s[1] = s[1].slice(1);
				 fins = "M"+s[1]+" L"+s[0];
			} else {
  			s[0] = s[0].slice(1);			
				if ( s[3]== "0,0" ) {
					 s[3] = "0,1";
				} else {
					s[3] = "0,0";
				}
  			fins = "M"+s[4]+" "+s[1]+" "+s[2]+" "+s[3]+" "+s[0];
			}
			
				a.setAttribute("path",fins);
	}
	c.appendChild(a);
	anim.push(a);
}

// el - circle/path; start,end - colours; freeze - 0/1
function anm_color (el, attrib, start, end, begin, dur, freeze) {
	var a;
	a = doc.createElement("animateColor");
	a.setAttribute("attributeType","CSS");
	a.setAttribute("attributeName",attrib);
	if (start != "UNKNOWN") a.setAttribute("from",start);
	a.setAttribute("to",end);
	a.setAttribute("begin",begin.toString(10));
	a.setAttribute("dur",dur.toString(10));
	if (freeze) a.setAttribute("fill","freeze");
	el.appendChild(a);
	anim.push(a);	
}

function anm_opacity (el, start, end, begin, dur, freeze) {
	var a;
	a = doc.createElement("animate");
	a.setAttribute("attributeType","CSS");
	a.setAttribute("attributeName","opacity");
	a.setAttribute("from",start);
	a.setAttribute("to",end);
	a.setAttribute("begin",begin.toString(10));
	a.setAttribute("dur",dur.toString(10));
	if (freeze) a.setAttribute("fill","freeze");	
	el.appendChild(a);
	anim.push(a);
}

function animate (el, atype, aname, start, end, begin, dur, freeze) {
	var a;
	a = doc.createElement("animate");
	a.setAttribute("attributeType",atype);
	a.setAttribute("attributeName",aname);
	a.setAttribute("from",start.toString(10));
	a.setAttribute("to",end.toString(10));
	a.setAttribute("begin",begin.toString(10));
	a.setAttribute("dur",dur.toString(10));
	if (freeze) a.setAttribute("fill","freeze");	
	el.appendChild(a);
	anim.push(a);
}

function set (el, attrib, to, begin) {
	var a;
	a = doc.createElement("set");
	a.setAttribute("attributeType","auto");
	a.setAttribute("attributeName",attrib);
	a.setAttribute("to",to);
	a.setAttribute("begin",begin.toString(10));
	el.appendChild(a);
	anim.push(a);
}

/* ADDITIONAL OBJECTS */
function label_node (ni, txt, stroke, fill, hidden) {
	var obj;
	obj = doc.createElement("text");
	obj.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
	obj.firstChild.data = txt.toString(10);
	obj.setAttribute("font-size","12px");
	obj.setAttribute("text-anchor","middle");
  obj.setAttribute("stroke",stroke);
  obj.setAttribute("fill",fill);
 	obj.setAttribute("x",(parseInt(nodes[ni].gi.getAttribute("cx"))).toString(10));
 	obj.setAttribute("y",(parseInt(nodes[ni].gi.getAttribute("cy"))+4).toString(10));
	if (hidden) obj.setAttribute("visibility","hidden");
	doc.getElementById("node_labels").appendChild(obj);
	objects.push(obj);
	return obj;
}


function label_node2 (ni, txt, stroke, fill, hidden) {
	var obj;
	obj = doc.createElement("text");
	obj.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
	obj.firstChild.data = txt.toString(10);
	obj.setAttribute("font-size","12px");
	obj.setAttribute("text-anchor","middle");
  obj.setAttribute("stroke",stroke);
  obj.setAttribute("fill",fill);
 	obj.setAttribute("x",(parseInt(nodes[ni].gi.getAttribute("cx"))+16).toString(10));
 	obj.setAttribute("y",(parseInt(nodes[ni].gi.getAttribute("cy"))-2).toString(10));
	if (hidden) obj.setAttribute("visibility","hidden");
	doc.getElementById("node_labels").appendChild(obj);
	objects.push(obj);
	return obj;
}

function label_node3 (ni, txt, stroke, fill, hidden) {
	var obj;
	obj = doc.createElement("text");
	obj.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
	obj.firstChild.data = txt.toString(10);
	obj.setAttribute("font-size","12px");
	obj.setAttribute("text-anchor","middle");
  obj.setAttribute("stroke",stroke);
  obj.setAttribute("fill",fill);
 	obj.setAttribute("x",(parseInt(ni.getAttribute("cx"))).toString(10));
 	obj.setAttribute("y",(parseInt(ni.getAttribute("cy"))+4).toString(10));
	if (hidden) obj.setAttribute("visibility","hidden");
	doc.getElementById("node_labels").appendChild(obj);
	objects.push(obj);
	return obj;
}

function make_rect (x, y, w, h, fill, stroke, sw, opacity) {
	var r;
	r = doc.createElement("rect");
	r.setAttribute("x",x.toString(10));
	r.setAttribute("y",y.toString(10));
	r.setAttribute("width",w.toString(10));
	r.setAttribute("height",h.toString(10));
 	r.setAttribute("fill",fill);
	r.setAttribute("stroke-width",sw.toString(10));
	r.setAttribute("stroke",stroke);
	r.setAttribute("opacity",opacity.toString(10));
	return r;
}

function make_ellipse (x, y, rx, ry, fill, stroke, sw, opacity) {
	var r;
	r = doc.createElement("ellipse");
	r.setAttribute("cx",x.toString(10));
	r.setAttribute("cy",y.toString(10));
	r.setAttribute("rx",rx.toString(10));
	r.setAttribute("ry",ry.toString(10));
 	r.setAttribute("fill",fill);
	r.setAttribute("stroke-width",sw.toString(10));
	r.setAttribute("stroke",stroke);
	r.setAttribute("opacity",opacity.toString(10));
	return r;
}
// makes cyrcle
function cyrcle(cx, cy, r, stroke, fill, opacity) {
		var cl;
  	cl = doc.createElement("circle");
    cl.setAttribute("cx",cx.toString(10));
    cl.setAttribute("cy",cy.toString(10));
    cl.setAttribute("r",r.toString(10));
    cl.setAttribute("stroke",stroke);
    cl.setAttribute("fill",fill);
    cl.setAttribute("opacity",opacity.toString(10)); 
    objects.push(cl);
    doc.getElementById("anim_nodes").appendChild(cl);
		return cl;
}


//------------------------------------------------------------------------------


function node_click (evt) {
	if (!curr_cmd) return;
	
	if (curr_cmd == "delete_node_b") {
		delete_node(evt.target);
		return;
	}
	if (curr_cmd == "move_node_b") { move_node(evt.target); return; }
	else if (curr_cmd == "add_edge_b") { add_edge(evt.target); return; }
	
	bar("Running " + ors);
	if (curr_cmd == "bfs_b") bfs(evt.target);
	else if (curr_cmd == "mst_b") mst(evt.target);
	else if (curr_cmd == "dfs_b") run_dfs(evt.target);
	else if (curr_cmd == "dijkstra_b") dijkstra(evt.target);
	else if (curr_cmd == "ap_b") artic_points(evt.target);
	else if (curr_cmd == "bridges_b") bridges(evt.target);
	else if (curr_cmd == "flow_bfs_b") flow_bfs(evt.target);
	else if (curr_cmd == "flow_dfs_b") flow_dfs(evt.target);
	else if (curr_cmd == "flow_dijkstra_b") flow_dijkstra(evt.target);
}

function edge_click (evt) {	
	if (curr_cmd == "delete_edge_b") delete_edge(evt.target);
	else edge_dblclick(evt);
}

// Modify edge weights by clicking the edges
function edge_dblclick (evt) {
		var edge = evt.target, i;
	if (algo) return;
	refresh();
	if (aef == 2)	aef = 1;
	
	for (i = 0; edges[i].gi != edge; i++) ;
	edges[i].wei = parseInt(prompt("Modifying an edge; specify integer weight lower than 10,000:","1")%10000);
	edges[i].weigi.firstChild.data = edges[i].wei.toString(10);
}

/* NODE FUNCTIONS */
function paint_node (n) {
	if (n.getAttribute("fill") == START)
		n.setAttribute("fill",ACTIVE);
	else
		n.setAttribute("fill",START);
}

function add_node () {
		var n, grp, pos;
	pos = getcoords();

	grp = doc.getElementById("nodes");
	n = doc.createElement("circle");
	n.setAttribute("r","6");
	n.setAttribute("cx",pos.x.toString(10));
	n.setAttribute("cy",pos.y.toString(10));
	n.setAttribute("fill","red");
	n.setAttribute("stroke","black");
	n.setAttribute("id","n"+nodes.length.toString(10));	
	grp.appendChild(n);
	
	// add to array
	nodes.push({gi:n,elist:new Array,relist:new Array});
}

function delete_node (c) {
		var i,k,n2;
	refresh();	
	// find in array
	for (i = 0; nodes[i].gi != c; i++) ;
	
	// delete connected edges
	for (k = 0; k < edges.length; k++) {
		if (edges[k].n1 == i || edges[k].n2 == i) {
			delete_edge(edges[k].gi);
			k--;
		}
	}
	
	// memmove
	for (k = i+1; k < nodes.length; k++) nodes[k-1] = nodes[k];
	nodes.pop();
	
	// update indices in edges to nodes
	for (k = 0; k < edges.length; k++) {
		if (edges[k].n1 > i) edges[k].n1--;
		if (edges[k].n2 > i) edges[k].n2--;
	}
	
	// graphics
	c.parentNode.removeChild(c);
}

function move_node (c) {
	var i, pos, e, k, x1, y1, x2, y2;
	if (mnf == 1) {
		movedn = c;
		mnf = 2;
		paint_node(movedn);
	} else {
		mnf = 1;
		paint_node(movedn);
	}	
}

/* EDGE FUNCTIONS */
function add_edge (c) {
		var grp, newl, i, n1, n2, len, wei, x1, x2, y1, y2, mx, my, rect, s, p;
		
		var f, d, r1, sina, cosa, gx, gy;
		
	if (aef == 1) {
		c1 = c;
		paint_node(c1);
		aef = 2;
	} else if (c1 != c) {
		for (n1 = 0; nodes[n1].gi != c1; n1++) ;
		for (n2 = 0; nodes[n2].gi != c; n2++) ;
		p=0;
		for (i = 0; i < edges.length; i++)	{
			if ( dir_mode==false ) {
				 if ( (edges[i].n1==n1 && edges[i].n2==n2)||(edges[i].n1==n2 && edges[i].n2==n1) ) {
				 		alert("Can't duplicate edges! Use the 'to directed' button to change the mode of the enviroment to Directed Graph.");
						return;
				 }
			} else {
				 if ( edges[i].n1==n1 && edges[i].n2==n2 ) {
				 		alert("Can't duplicate edges!");
						return;
				 }
				 if ( edges[i].n1==n2 && edges[i].n2==n1 ) {
				 		p=1;
				 } 
			}		
		}
		if ( p==1 )	{
	 	 	 	x1 = parseInt(nodes[n1].gi.getAttribute("cx"));
    		y1 = parseInt(nodes[n1].gi.getAttribute("cy")); 
    		x2 = parseInt(nodes[n2].gi.getAttribute("cx"));
    		y2 = parseInt(nodes[n2].gi.getAttribute("cy"));
  
  			f = Math.atan2(y2-y1,x2-x1);
  			f = f*180/3.1415725;
   			d = 35;
  			mx = (x1+x2)/2;
    		my = (y1+y2)/2;
  
  			sina = (y2-y1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  			cosa = (x2-x1)/Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  			gx = mx + sina*d; 
  			gy = my - cosa*d;
  			r1 = ((x1-gx)*(x1-gx)+(y1-gy)*(y1-gy))/(2*d);
  			
  			newl = doc.createElement("path");			
  	  	newl.setAttribute("d","M"+x1.toString(10)+","+y1.toString(10)+" A"+r1.toString(10)+","+r1.toString(10)+" "+f.toString(10)+" 0,1 "+x2.toString(10)+","+y2.toString(10));
    		newl.setAttribute("stroke","black"); 
    		newl.setAttribute("stroke-width","4");
  			newl.setAttribute("fill","none");
  			newl.setAttribute("marker-end","url(#arrow)");
    		doc.getElementById("edges").appendChild(newl);
    		  		
    		// background of weight
    		rect = doc.createElement("rect");
    		rect.setAttribute("fill","green");
    		rect.setAttribute("opacity","0.4");
    		rect.setAttribute("x",(gx-20).toString(10));
    		rect.setAttribute("y",(gy-16).toString(10));
    		rect.setAttribute("width","40");
    		rect.setAttribute("height","22");
    		rect.setAttribute("id","bg"+edges.length.toString(10));
    		doc.getElementById("edge_weights").appendChild(rect);
  			
    		// actual text
				if ( bul==1 )
        	len=parseInt(prompt("Adding an edge; specify integer weight lower than 10,000:","1")%10000);
				else 
				  len=0;
    		wei = doc.createElement("text");
    		wei.setAttribute("id","patt"+edges.length.toString(10));
    		wei.setAttribute("font-size","16px");
    		wei.setAttribute("text-anchor","middle");
    		wei.setAttribute("font-weight","bold");
    		wei.setAttribute("stroke","black");
    		wei.setAttribute("stroke-width","0");
    		wei.setAttribute("fill","white");
    		wei.setAttribute("x",gx.toString(10));
    		wei.setAttribute("y",gy.toString(10));
    		wei.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
    		wei.firstChild.data = len.toString(10);
    		doc.getElementById("edge_weights").appendChild(wei);
  			
  			// adds to array
  			edges.push({gi:newl, n1:n1, n2:n2, wei:len, weigi:wei, rectgi:rect});
  			nodes[n1].elist.push(edges.length-1);
  			nodes[n2].relist.push(edges.length-1);
				
				if ( bul==1 )
				  paint_node(c1);
				aef = 1;
				return;
		} else {
    		newl = doc.createElement("path");
    		x1 = c1.getAttribute("cx");
    		y1 = c1.getAttribute("cy"); 
    		x2 = c.getAttribute("cx");
    		y2 = c.getAttribute("cy");
    		s = "M"+x1.toString(10)+","+y1.toString(10)+" L"+x2.toString(10)+","+y2.toString(10);
    		newl.setAttribute("d",s);
    		newl.setAttribute("stroke","black"); 
    		newl.setAttribute("stroke-width","4");
    		doc.getElementById("edges").appendChild(newl);
    
    		mx = (parseInt(x1)+parseInt(x2))/2;
    		my = (parseInt(y1)+parseInt(y2))/2;
    		
    		// background of weight
    		rect = doc.createElement("rect");
    		rect.setAttribute("fill","green");
    		rect.setAttribute("opacity","0.4");
    		rect.setAttribute("x",(mx-20).toString(10));
    		rect.setAttribute("y",(my-16).toString(10));
    		rect.setAttribute("width","40");
    		rect.setAttribute("height","22");
    		rect.setAttribute("id","bg"+edges.length.toString(10));
    		doc.getElementById("edge_weights").appendChild(rect);
    		// actual text
    		len=parseInt(prompt("Adding an edge; specify integer weight lower than 10,000:","1")%10000);
    		wei = doc.createElement("text");
    		wei.setAttribute("id","patt"+edges.length.toString(10));
    		wei.setAttribute("font-size","16px");
    		wei.setAttribute("text-anchor","middle");
    		wei.setAttribute("font-weight","bold");
    		wei.setAttribute("stroke","black");
    		wei.setAttribute("stroke-width","0");
    		wei.setAttribute("fill","white");
    		wei.setAttribute("x",mx.toString(10));
    		wei.setAttribute("y",my.toString(10));
    		wei.appendChild(doc.getElementById("patt").firstChild.cloneNode(0));
    		wei.firstChild.data = len.toString(10);
    		doc.getElementById("edge_weights").appendChild(wei);
    
    		paint_node(c1);
    		aef = 1;	
    		
    		// add to arrays
    		if (dir_mode == false) {
    			edges.push({gi:newl, n1:n1, n2:n2, wei:len, weigi:wei, rectgi:rect});
    			nodes[n1].elist.push(edges.length-1);
    			nodes[n2].elist.push(edges.length-1);
    			path_edges++;
    		} else {
    			// moves the path at the end of the array
    			edges.push({gi:newl, n1:n1, n2:n2, wei:len, weigi:wei, rectgi:rect});
//    			edges[edges.length-1] = edges[path_edges];
					edges[edges.length-1].gi = edges[path_edges].gi;
					edges[edges.length-1].n1 = edges[path_edges].n1;
					edges[edges.length-1].n2 = edges[path_edges].n2;
					edges[edges.length-1].wei = edges[path_edges].wei;
					edges[edges.length-1].weigi = edges[path_edges].weigi;
					edges[edges.length-1].rectgi = edges[path_edges].rectgi;
    			edges[path_edges].gi = newl;
    			edges[path_edges].n1 = n1;
    			edges[path_edges].n2 = n2;
    			edges[path_edges].wei = len;
    			edges[path_edges].weigi = wei;
    			edges[path_edges].rectgi = rect;			
				
					// Updateing the index of the nodes
					for ( i=0 ; i<nodes.length ; i++ ) {
							for ( j=0 ; j<nodes[i].elist.length ; j++ )	{
									if ( nodes[i].elist[j]==path_edges )
										 nodes[i].elist[j] = edges.length-1;
							}
							for ( j=0 ; j<nodes[i].relist.length ; j++ )	{
									if ( nodes[i].relist[j]==path_edges )
										 nodes[i].relist[j] = edges.length-1;
							}
					}
      		nodes[n1].elist.push(path_edges);
    			nodes[n2].relist.push(path_edges);
    			path_edges++;
    			newl.setAttribute("marker-end","url(#arrow)");
    		}				
		}
	} else {
		paint_node(c1);
		aef = 1;
	}
}


function delete_edge (line) {
		var n1, n2, i, j, k;

	for (i = 0; edges[i].gi != line; i++) ;
	n1 = nodes[edges[i].n1]; n2 = nodes[edges[i].n2];

	for (j = 0; n1.elist[j] != i; j++) ;
 
	n1.elist[j] = n1.elist[n1.elist.length-1];
 	n1.elist.pop();

	if ( dir_mode==false ) {
		for (j = 0; n2.elist[j] != i; j++) ;
		n2.elist[j] = n2.elist[n2.elist.length-1];
		n2.elist.pop();
	} else {
		for (j = 0; n2.relist[j] != i; j++) ;
		n2.relist[j] = n2.relist[n2.relist.length-1];
		n2.relist.pop();
	}

	// graphics
	line.parentNode.removeChild(line);
	edges[i].weigi.parentNode.removeChild(edges[i].weigi);
	edges[i].rectgi.parentNode.removeChild(edges[i].rectgi);

	if ( i<path_edges )
		 path_edges--;
	for (k = i+1; k < edges.length; k++) edges[k-1] = edges[k];
	edges.pop();
	
	// update edge indices in nodes
	for (k = 0; k < nodes.length; k++) {
		for (j = 0; j < nodes[k].elist.length; j++)
			if (nodes[k].elist[j] > i) nodes[k].elist[j]--;
		for (j = 0; j < nodes[k].relist.length; j++)
			if (nodes[k].relist[j] > i) nodes[k].relist[j]--;
	}

}

function refresh()	{ 
		var i, j;

	// Deleting Animations
	for ( i=anim.length-1 ; i>=0 ; i-- )	{
		anim[i].parentNode.removeChild(anim[i]);
		anim.pop();
	}
	
	// Deleting Objects
	for ( i=objects.length-1 ; i>=0 ; i-- )	{
		objects[i].parentNode.removeChild(objects[i]);
		objects.pop();
	}
	
	// Deleting Fake edges from the Flows //add by NB
	for ( i=fake_edge.length-1 ; i>=0 ; i-- ) {
			delete_edge(fake_edge[fake_edge.length-1]);
			fake_edge.pop();
	}
	
	// Restoring the opacity of the rect.gi and weigi
	for ( i=0 ; i<edges.length ; i++ ) {
	   edges[i].rectgi.setAttribute("opacity","0.4");
	   edges[i].weigi.setAttribute("opacity","1");		 
	}

	// Refreshing Nodes	
	for ( i=0 ; i<nodes.length ; i++ )	{
		nodes[i].gi.setAttribute("fill","red");
		nodes[i].gi.setAttribute("stroke","black");
		nodes[i].gi.setAttribute("opacity","1");
	}	
	
	// Refreshing Edges
	for ( i=0 ; i<edges.length ; i++ )	{
		edges[i].gi.setAttribute("stroke","black");			
	}

	if (algo) {
		// drop down the menu
		doc.getElementById("algo_svg").setAttribute("y","0%");

		// unclick any button
		if (savetn != null) savetn.setAttribute("stroke","url(#gr_normal)");
		curr_cmd = null;	

		// keep any running menu on
		if (menuon)	
			set(doc.getElementById(last_menu),"x","80%",((new Date()).valueOf() - time0)/1000-0.5);
		
		// new text
		doc.getElementById("algos_b_text").firstChild.data = "construct";
		
		// clear bar
		bar("Choose an algorithm");
	} else doc.getElementById("algo_svg").setAttribute("y","-64.5%");

}


function getcoords()  {
        var x, y, s, tx, ty;
  s = doc.rootElement.currentScale;
  tx = doc.rootElement.currentTranslate.x;
  ty = doc.rootElement.currentTranslate.y;
  x = (evt.clientX-tx)/s;  y = (evt.clientY-ty)/s;
  x = Math.round(x);  y = Math.round(y);
  return {x:x,y:y};
}


/* TASKBAR */
function bar (s) {
		var tn;
	tn = doc.getElementById("taskbar");
	for (tn = tn.firstChild; tn.nodeName != "text"; tn = tn.nextSibling) ;
	tn.firstChild.data = s;
}


/* ALGORITHMS */

/* Depth-First Search - Nikolay Valtchanov */
function dfs (ni, pred_ni, eix) {
	var i, j, ni2, e, secs = 3, x1, y1, x2, y2, obj, an;
		
	visited[ni] = 1;
	
	// active path set
	if (pred_ni != null) { 
		set(nodes[ni].gi,"fill",ACTIVE,begin+dfs_cnt+secs);
		
		obj = doc.createElement("circle");
		obj.setAttribute("r","7");
		obj.setAttribute("fill","white");
		obj.setAttribute("opacity","0.7");
		obj.setAttribute("stroke","black");
		doc.getElementById("anim_nodes").appendChild(obj);
		
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,0);
		anm_color(edges[eix].gi,"stroke",ESTART,EACTIVE,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}
		
	for (i = 0; i < nodes[ni].elist.length; i++) {
		e = edges[nodes[ni].elist[i]];
		ni2 = (e.n1 == ni) ? e.n2 : e.n1;
		if (!visited[ni2]) {
			dfs(ni2,ni,nodes[ni].elist[i]);
		}
	}
	
	if (pred_ni != null) {
		set(nodes[ni].gi,"fill",VISITED,begin+dfs_cnt);

		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,1);
		anm_color(edges[eix].gi,"stroke",EACTIVE,EVISITED,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}
}

function run_dfs (n) {
		var i, secs = 3;
	for (i = 0; i < nodes.length; i++) visited[i] = 0;
	for (i = 0; nodes[i].gi != n; i++) ;
	begin = ((new Date()).valueOf() - time0)/1000;
	dfs_cnt = 1;
	
	// bounce the choice
	anclr = doc.createElement("animate");
	anclr.setAttribute("begin",begin);
	anclr.setAttribute("dur",(secs/4).toString(10));
	anclr.setAttribute("attributeType","XML");
	anclr.setAttribute("attributeName","r");
	anclr.setAttribute("from","6");
	anclr.setAttribute("to","9");
	anclr.setAttribute("fill","freeze");
	nodes[i].gi.appendChild(anclr);
	anim.push(anclr);	
	anclr = doc.createElement("animate");
	anclr.setAttribute("begin",begin);
	anclr.setAttribute("dur",(secs/2).toString(10));
	anclr.setAttribute("attributeType","XML");
	anclr.setAttribute("attributeName","r");
	anclr.setAttribute("from","9");
	anclr.setAttribute("to","6");
	anclr.setAttribute("fill","freeze");
	nodes[i].gi.appendChild(anclr);
	anim.push(anclr);	
	dfs(i,null,null);
}

/* Dijkstra's Algorithm - Nikolay Valtchanov */
function dijkstra (n) {
	var q, i1, i2, state, best, prede, firsti, mini, i, t, v, cr;
	var secs = 2, cnt, set, anclr;
	// perform some checks first
	for (i = 0; i < edges.length; i++)
		if (edges[i].wei <= 0 || edges[i].wei.toString(10) == "NaN") {
			alert("All edge weights have to be positive integers to run this algorithm. Please edit them properly.");
			refresh();
			return;
		}
	prede = new Array;
	begin = ((new Date()).valueOf() - time0)/1000;
	cnt = 0;
		
	state = new Array;	// 0-not reached yet; 1-added to queue; 2-defined
	for (i = 0; i < nodes.length; i++) state[i] = 0;
	best = new Array;
	for (i = 0; i < nodes.length; i++) best[i] = Infinity;
	q = new Array;
	i1 = i2 = 0;
	
	for (firsti = 0; nodes[firsti].gi != n; firsti++) ;
	best[firsti] = 0;
	q[i2++] = firsti;
	prede[firsti] = -1;
	
	for (; i1 < i2; i1++)  {
		// find best vertex in state=1
		for (mini = i1, i = i1+1; i < i2; i++)
			if (best[q[mini]] > best[q[i]]) mini = i;
		if (mini != i1)	{ t = q[mini]; q[mini] = q[i1]; q[i1] = t; }
		state[q[i1]] = 2;

		// blink animation
		anclr = doc.createElement("animate");
		anclr.setAttribute("begin",begin+cnt);
		anclr.setAttribute("dur",(secs/4).toString(10));
		anclr.setAttribute("attributeType","XML");
		anclr.setAttribute("attributeName","r");
		anclr.setAttribute("from","6");
		anclr.setAttribute("to","20");
		anclr.setAttribute("fill","freeze");
		nodes[q[i1]].gi.appendChild(anclr);
		anim.push(anclr);	
		anclr = doc.createElement("animate");
		anclr.setAttribute("begin",begin+cnt);
		anclr.setAttribute("dur",(secs/2).toString(10));
		anclr.setAttribute("attributeType","XML");
		anclr.setAttribute("attributeName","r");
		anclr.setAttribute("from","20");
		anclr.setAttribute("to","6");
		anclr.setAttribute("fill","freeze");
		nodes[q[i1]].gi.appendChild(anclr);
		anim.push(anclr);

		if (prede[q[i1]] != -1) {		
			// change colors
			anclr = doc.createElement("animateColor");
			anclr.setAttribute("attributeType","XML");
			anclr.setAttribute("begin",begin+cnt);
			anclr.setAttribute("dur",secs.toString(10));
			anclr.setAttribute("from",ACTIVE);
			anclr.setAttribute("attributeName","fill");	
			anclr.setAttribute("to",VISITED);
			anclr.setAttribute("fill","freeze");
			nodes[q[i1]].gi.appendChild(anclr);
			anim.push(anclr);
			anclr = doc.createElement("animateColor");
			anclr.setAttribute("attributeType","XML");
			anclr.setAttribute("begin",begin+cnt);
			anclr.setAttribute("dur",secs.toString(10));
			anclr.setAttribute("from",ESTART);
			anclr.setAttribute("attributeName","stroke");
			anclr.setAttribute("to",EACTIVE);
			anclr.setAttribute("fill","freeze");
			edges[prede[q[i1]]].gi.appendChild(anclr);
			anim.push(anclr);
		}		
		cnt += secs;
		
		for (i = 0; i < nodes[q[i1]].elist.length; i++) {
			v = (edges[nodes[q[i1]].elist[i]].n1 == q[i1]) ? edges[nodes[q[i1]].elist[i]].n2 : edges[nodes[q[i1]].elist[i]].n1;
			if (state[v] == 0) {
				q[i2++] = v;
				state[v] = 1;
				
				// graphics
				anclr = doc.createElement("animateColor");
				anclr.setAttribute("attributeType","XML");
				anclr.setAttribute("begin",begin+cnt);
				anclr.setAttribute("dur",secs.toString(10));
				anclr.setAttribute("attributeName","fill");
				anclr.setAttribute("from",START);
				anclr.setAttribute("to",ACTIVE);
				anclr.setAttribute("fill","freeze");
				nodes[v].gi.appendChild(anclr);
				anim.push(anclr);
			}
			if (state[v] == 1)
				if (best[v] > best[q[i1]]+edges[nodes[q[i1]].elist[i]].wei) {
					best[v] = best[q[i1]]+edges[nodes[q[i1]].elist[i]].wei;
					prede[v] = nodes[q[i1]].elist[i];
				}
		}
		cnt += 2*secs;
	}
}

/* MST Kruskal - Nikolay Valtchanov */
function mst2 (evt) {
	var root, sedges, t, tweight = 0, x=0;
	var cnt = 0, begin, secs = 2, set, anclr;
	
	root = new Array;
	sedges = new Array;

	begin = ((new Date()).valueOf() - time0)/1000;

	for (i = 0; i < nodes.length; i++) {
		root[i] = i;
		set = doc.createElement("set");
		set.setAttribute("begin",begin.toString(10));
		set.setAttribute("to",CLRSLIST[i]);
		set.setAttribute("attributeType","XML");
		set.setAttribute("attributeName","fill");
		nodes[i].gi.appendChild(set);
		anim.push(set);
	}
	cnt += secs;
	
	for (i = 0; i < edges.length; i++) sedges[i] = i;
	for (i = 0; i < sedges.length; i++) {
		for (j = i+1; j < sedges.length; j++)
			if (edges[sedges[i]].wei > edges[sedges[j]].wei) {
				t = sedges[i];
				sedges[i] = sedges[j];
				sedges[j] = t;
			}
	}
	
	
	for (i = 0; i < sedges.length; i++)
		if (root[edges[sedges[i]].n1] != root[edges[sedges[i]].n2]) {
			t = root[edges[sedges[i]].n1];
			for (j = 0; j < nodes.length; j++)
				if (root[j] == t) {
					root[j] = root[edges[sedges[i]].n2];
					
					//
					anclr = doc.createElement("animateColor");
					anclr.setAttribute("attributeType","XML");
					anclr.setAttribute("begin",(begin+cnt).toString(10));
					anclr.setAttribute("dur",secs.toString(10));
					anclr.setAttribute("attributeName","fill");
					anclr.setAttribute("from",CLRSLIST[t]);
					anclr.setAttribute("to",CLRSLIST[root[j]]);
					anclr.setAttribute("fill","freeze");
					nodes[j].gi.appendChild(anclr);
					anim.push(anclr);
					//

				}
			
			// bounce
			anclr = doc.createElement("animate");
			anclr.setAttribute("begin",(begin+cnt).toString(10)+"s");
			anclr.setAttribute("dur",(secs/4).toString(10));
			anclr.setAttribute("attributeType","XML");
			anclr.setAttribute("attributeName","stroke-width");
			anclr.setAttribute("from","4");
			anclr.setAttribute("to","9");
			anclr.setAttribute("fill","freeze");
			edges[sedges[i]].gi.appendChild(anclr);
			anim.push(anclr);	
			anclr = doc.createElement("animate");
			anclr.setAttribute("begin",(begin+cnt).toString(10)+"s");
			anclr.setAttribute("dur",(secs/2).toString(10));
			anclr.setAttribute("attributeType","XML");
			anclr.setAttribute("attributeName","stroke-width");
			anclr.setAttribute("from","9");
			anclr.setAttribute("to","4");
			anclr.setAttribute("fill","freeze");
			edges[sedges[i]].gi.appendChild(anclr);
			anim.push(anclr);	
			
			// color
			anclr = doc.createElement("animateColor");
			anclr.setAttribute("attributeType","XML");
			anclr.setAttribute("begin",(begin+cnt).toString(10));
			anclr.setAttribute("dur",secs.toString(10));
			anclr.setAttribute("attributeName","stroke");
			anclr.setAttribute("from",ESTART);
			anclr.setAttribute("to",EACTIVE);
			anclr.setAttribute("fill","freeze");
			edges[sedges[i]].gi.appendChild(anclr);
			anim.push(anclr);
			cnt += 2*secs;
			//
							
			tweight += edges[sedges[i]].wei;
		}	
		
		bar("The total weight of the tree is: "+tweight.toString(10));
}

/* Stronlgy Connected Components in a directed graph - Nikolay Valtchanov */
// straight dfs for postnumbering
function scc_dfs (ni, pred_ni, eix) {
	var i, j, ni2, e, secs = 3, obj;

	visited[ni] = 1;
	
	// active path set
	if (pred_ni != -1) { 
		set(nodes[ni].gi,"fill",ACTIVE,begin+dfs_cnt+secs);
		
		obj = doc.createElement("circle");
		obj.setAttribute("r","7");
		obj.setAttribute("fill","white");
		obj.setAttribute("opacity","0.7");
		obj.setAttribute("stroke","black");
		doc.getElementById("anim_nodes").appendChild(obj);
		objects.push(obj);
		
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,0);
		anm_color(edges[eix].gi,"stroke",ESTART,EACTIVE,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}
		
		
	for (i = 0; i < nodes[ni].elist.length; i++) {
		e = edges[nodes[ni].elist[i]];
		ni2 = (e.n1 == ni) ? e.n2 : e.n1;
		if (!visited[ni2]) {
			scc_dfs(ni2,ni,nodes[ni].elist[i]);
		}
	}
	
	set(nodes[ni].gi,"fill",VISITED,begin+dfs_cnt);
	if (pred_ni != -1) {
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,1);
		anm_color(edges[eix].gi,"stroke",EACTIVE,EVISITED,begin+dfs_cnt,secs,1);
	}
	
	postnum[++curr] = ni;

	obj = label_node(ni,curr,"white","white",1);
	set(obj,"visibility","visible",begin+dfs_cnt);
	dfs_cnt += secs;
}

// dfs on the reversed graph - finds the SCCs
function scc_bdfs (ni, pred_ni, eix, nc) {
	var i, j, ni2, e, secs = 3, obj;

	comp[ni] = nc;
	
	// active path set
	if (pred_ni != -1) { 
		set(nodes[ni].gi,"fill",ACTIVE,begin+dfs_cnt+secs);
		
		obj = doc.createElement("circle");
		obj.setAttribute("r","7");
		obj.setAttribute("fill","white");
		obj.setAttribute("opacity","0.7");
		obj.setAttribute("stroke","black");
		doc.getElementById("anim_nodes").appendChild(obj);
		objects.push(obj);
		
		anm_motion(obj,ni,pred_ni,begin+dfs_cnt,secs,1);
		anm_color(edges[eix].gi,"stroke",ESTART,EACTIVE,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}
	
	for (i = 0; i < nodes[ni].relist.length; i++) {
		e = edges[nodes[ni].relist[i]];
		ni2 = (e.n1 == ni) ? e.n2 : e.n1;
		if (!comp[ni2]) {
			scc_bdfs(ni2,ni,nodes[ni].relist[i],nc);
		}
	}
	
	set(nodes[ni].gi,"fill",CLRSLIST[nc],begin+dfs_cnt);
	if (pred_ni != -1) {
		anm_motion(obj,ni,pred_ni,begin+dfs_cnt,secs,0);
		anm_color(edges[eix].gi,"stroke",EACTIVE,EVISITED,begin+dfs_cnt,secs,1);
	}
	
	dfs_cnt += secs;
}

// the start fucntion for the SCC algorithm
function scc () {
	var secs=3, nc = 0, i;	

	for (i = 0; i < nodes.length; i++) visited[i] = 0;
	postnum = new Array;
	comp = new Array;
	for (i = 0; i < nodes.length; i++) comp[i] = 0;
	
	begin = ((new Date()).valueOf() - time0)/1000;
	dfs_cnt = 0;
	curr = 0;
	
	// make circles larger since numbering should be quite big
	for (i = 0; i < nodes.length; i++) {
		set(nodes[i].gi,"r","9",begin);
		if (!visited[i]) {
			anm_color(nodes[i].gi,"fill",START,ACTIVE,begin+dfs_cnt,secs/2,1);
			dfs_cnt += secs/2;
			scc_dfs(i,-1,-1);
			dfs_cnt -= secs/2;
		}
	}
	
	for (i = 0; i < edges.length; i++) set(edges[i].gi,"stroke",ESTART,begin+dfs_cnt);
	dfs_cnt += secs;	
	
	for (i = nodes.length; i >= 1; i--) 
		if (!comp[postnum[i]]) {
			nc++;
			anm_color(nodes[postnum[i]].gi,"fill",VISITED,CLRSLIST[nc],begin+dfs_cnt,secs/2,1);
			dfs_cnt += secs/2;
			scc_bdfs(postnum[i],-1,-1,nc);
			dfs_cnt -= secs/2	
		}
}

/* Articulation Points - Nikolay Valtchanov */
function ap_dfs (ni, pred_ni, eix) {
	var i, j, ni2, e, secs = 3, obj, r, txt, s, ap=0, subt=0;

	prenum[ni] = ++curr;
	low[ni] = prenum[ni];

	// active path set
	if (pred_ni != -1) {
		r = make_ellipse(parseInt(nodes[ni].gi.getAttribute("cx"))+16,parseInt(nodes[ni].gi.getAttribute("cy"))-6,12,7,"red","black",1,1);
		doc.getElementById("node_labels").appendChild(r);
		objects.push(r);
			 
		set(nodes[ni].gi,"fill",ACTIVE,begin+dfs_cnt+secs);
		
		obj = doc.createElement("circle");
		obj.setAttribute("r","7");
		obj.setAttribute("fill","white");
		obj.setAttribute("opacity","0.7");
		obj.setAttribute("stroke","black");
		doc.getElementById("anim_nodes").appendChild(obj);
		objects.push(obj);
		
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,0);
		anm_color(edges[eix].gi,"stroke",ESTART,EACTIVE,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}

	txt = label_node(ni,prenum[ni].toString(10),"white","white",1);
	set(txt,"visibility","visible",begin+dfs_cnt);
	if (pred_ni != -1) {
		txt = label_node2(ni,prenum[ni].toString(10),"white","white",1);
		set(txt,"visibility","visible",begin+dfs_cnt);
		list[ni].push(txt);
	}

	for (i = 0; i < nodes[ni].elist.length; i++) {
		e = edges[nodes[ni].elist[i]];
		ni2 = (e.n1 == ni) ? e.n2 : e.n1;
		if (!prenum[ni2]) {
			ap_dfs(ni2,ni,nodes[ni].elist[i]);
			subt++;

  		if (pred_ni != -1 && pred_ni != ni2 && low[ni2] < low[ni]) {
  			low[ni] = low[ni2];
 			set(list[ni][list[ni].length-1],"visibility","hidden",begin+dfs_cnt);
			txt = label_node2(ni,low[ni].toString(10),"white","white",1);
  	       	list[ni].push(txt);
  			
   			set(list[ni][list[ni].length-1],"visibility","visible",begin+dfs_cnt);
   			animate(e.gi,"XML","stroke-width","9","4",begin+dfs_cnt,secs,1);

			dfs_cnt += secs;    						
  		}			
			
			if (pred_ni != -1 && prenum[ni] <= low[ni2]) {
				set(nodes[ni].gi,"stroke-width","3",begin+dfs_cnt);
				set(nodes[ni].gi,"fill","green",begin+dfs_cnt);
				ap++;
			}
		} else if (pred_ni != -1 && pred_ni != ni2 && prenum[ni2] < low[ni]) {
			low[ni] = prenum[ni2];
			set(list[ni][list[ni].length-1],"visibility","hidden",begin+dfs_cnt);

			txt = label_node2(ni,low[ni].toString(10),"white","white",1);
       		list[ni].push(txt);

			set(list[ni][list[ni].length-1],"visibility","visible",begin+dfs_cnt);
			animate(e.gi,"XML","stroke-width","9","4",begin+dfs_cnt,secs,1);
						
			dfs_cnt += secs;
		}
		
	}
	
	if (pred_ni != -1) {
		if (!ap) set(nodes[ni].gi,"fill",VISITED,begin+dfs_cnt);
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,1);
		anm_color(edges[eix].gi,"stroke",EACTIVE,EVISITED,begin+dfs_cnt,secs,1);
	} else if (subt >= 2) {
		set(nodes[ni].gi,"stroke-width","3",begin+dfs_cnt);
		set(nodes[ni].gi,"fill","green",begin+dfs_cnt);
	}
		
	dfs_cnt += secs;
}


function artic_points (n) {
	var i, firsti, secs=3;

	for (firsti = 0; nodes[firsti].gi != n; firsti++);
	
	list = new Array;
	
	for (i = 0; i < nodes.length; i++) {
		list[i] = new Array;
		prenum[i] = 0;
		low[i] = 0;
	}
	
	begin = ((new Date()).valueOf() - time0)/1000;
	dfs_cnt = 0;
	curr = 0;
	
	anm_color(nodes[firsti].gi,"fill",ACTIVE,START,begin+dfs_cnt,secs/2,1);
	dfs_cnt += secs/2;
	ap_dfs(firsti,-1,-1);
	
	// make circles larger since numbering should be quite big
	for (i = 0; i < nodes.length; i++) 
		if (prenum[i])
			set(nodes[i].gi,"r","9",begin);	
}


function bridges_dfs (ni, pred_ni, eix, firsti) {
	var i, j, ni2, e, secs = 3, obj, r, txt, s, ap=0, subt=0;

	prenum[ni] = ++curr;
	low[ni] = prenum[ni];

	// active path set
	if (pred_ni != -1) {
		r = make_ellipse(parseInt(nodes[ni].gi.getAttribute("cx"))+16,parseInt(nodes[ni].gi.getAttribute("cy"))-6,12,7,"red","black",1,1);
		doc.getElementById("node_labels").appendChild(r);
		objects.push(r);
			 
		set(nodes[ni].gi,"fill",ACTIVE,begin+dfs_cnt+secs);
		
		obj = doc.createElement("circle");
		obj.setAttribute("r","7");
		obj.setAttribute("fill","white");
		obj.setAttribute("opacity","0.7");
		obj.setAttribute("stroke","black");
		doc.getElementById("anim_nodes").appendChild(obj);
		objects.push(obj);
		
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,0);
		anm_color(edges[eix].gi,"stroke",ESTART,EACTIVE,begin+dfs_cnt,secs,1);
		dfs_cnt += secs;
	}

	txt = label_node(ni,prenum[ni].toString(10),"white","white",1);
	set(txt,"visibility","visible",begin+dfs_cnt);
	if (pred_ni != -1) {
		txt = label_node2(ni,low[ni].toString(10),"white","white",1);
		set(txt,"visibility","visible",begin+dfs_cnt);
		list[ni].push(txt);
	}

	for (i = 0; i < nodes[ni].elist.length; i++) {
		e = edges[nodes[ni].elist[i]];
		ni2 = (e.n1 == ni) ? e.n2 : e.n1;
		if (ni2 == firsti && firsti != pred_ni) rt_reached++;
		if (!prenum[ni2]) {
			bridges_dfs(ni2,ni,nodes[ni].elist[i],firsti);
			if (ni == firsti) rtsubt.push(e);
			
  		if (pred_ni != -1 && pred_ni != ni2 && low[ni2] < low[ni]) {
  			low[ni] = low[ni2];
 				set(list[ni][list[ni].length-1],"visibility","hidden",begin+dfs_cnt);

				txt = label_node2(ni,low[ni].toString(10),"white","white",1);
  	       	list[ni].push(txt);
  			
   			set(list[ni][list[ni].length-1],"visibility","visible",begin+dfs_cnt);
   			animate(e.gi,"XML","stroke-width","9","4",begin+dfs_cnt,secs,1);
    						
   			dfs_cnt += secs;
  		}			
			
		} else if (pred_ni != -1 && ni2 != pred_ni && prenum[ni2] < low[ni]) {
			low[ni] = prenum[ni2];
			set(list[ni][list[ni].length-1],"visibility","hidden",begin+dfs_cnt);

			txt = label_node2(ni,low[ni].toString(10),"white","white",1);
       	list[ni].push(txt);

			set(list[ni][list[ni].length-1],"visibility","visible",begin+dfs_cnt);
			animate(e.gi,"XML","stroke-width","9","4",begin+dfs_cnt,secs,1);
						
			dfs_cnt += secs;
		}
		
	}
	
	if (pred_ni != -1) {
		if (pred_ni != firsti && prenum[pred_ni] < low[ni]) {
			anm_color(edges[eix].gi,"stroke","white","red",begin+dfs_cnt,secs/2,1);
			animate(edges[eix].gi,"XML","stroke-width","4","6",begin+dfs_cnt,secs/2,1);
	} else
			anm_color(edges[eix].gi,"stroke",EACTIVE,EVISITED,begin+dfs_cnt,secs,1);
		
		set(nodes[ni].gi,"fill",VISITED,begin+dfs_cnt);
		anm_motion(obj,pred_ni,ni,begin+dfs_cnt,secs,1);

	} else if (subt >= 2 || !rt_reached) {
		for (i = 0; i < rtsubt.length; i++) {
			anm_color(rtsubt[i].gi,"stroke","white","red",begin+dfs_cnt,secs/2,1);
			animate(rtsubt[i].gi,"XML","stroke-width","4","6",begin+dfs_cnt,secs/2,1);
		}
	}
		
	dfs_cnt += secs;
}

function bridges (n) {
	var i, firsti, secs=3;

	for (firsti = 0; nodes[firsti].gi != n; firsti++);
	
	list = new Array;
	rtsubt = new Array;
	
	for (i = 0; i < nodes.length; i++) {
		list[i] = new Array;
		prenum[i] = 0;
		low[i] = 0;
	}
	
	begin = ((new Date()).valueOf() - time0)/1000;
	dfs_cnt = 0;
	curr = 0;
	rt_reached = 0;
	
	anm_color(nodes[firsti].gi,"fill",ACTIVE,START,begin+dfs_cnt,secs/2,1);
	dfs_cnt += secs/2;
	bridges_dfs(firsti,-1,-1,firsti);
	
	// make circles larger since numbering should be quite big
	for (i = 0; i < nodes.length; i++) 
		if (prenum[i])
			set(nodes[i].gi,"r","9",begin);
}



/* BFS - Nikola Borisof */
function bfs (n) {
		var i, j, start, used, tail, edge, p1, p2, p3, br, an, comes, prc=1, dur1, dur2, d1, d2;
		var x, y, x1, y1, cl;
		
		// pointers for the Tail
			p1 = 0; p2 = 1; p3 = 1; 
		// counts the level
			br=1;  
		// Time durations for the Animations
			dur1="1.2s"; dur2="5s"; d1=1.2 ; d2=5;
		// Arrays
			used = new Array;
			comes = new Array;
			tail = new Array;
			edge = new Array;
		//Saves the time when the algorithm begins
			begin = ((new Date()).valueOf() - time0)/1000;
	//Gets the index of the starting point n
	for ( i=0 ; i<nodes.length && n != nodes[i].gi ; i++ );
	start = i;
			
	//Inits
	for ( i=0 ; i<nodes.length ; i++ )	{
		used[i] = 0;
	}	
	tail[0] = start;	used[start] = 1;	comes[0] = start;
	
	do	{
		br++;
		for ( i=p1 ; i<p2 ; i++ )	{
			/* Animation */
				if ( i!=0 )	{
					//nodes color and opasity

						anm_color(nodes[comes[i]].gi,"fill",ACTIVE,VISITED,(begin+(br-2)*d2),d1,1);
					
					//nodes color and opasity

  					nodes[tail[i]].gi.setAttribute("opacity",prc.toString(10));
						anm_color(nodes[tail[i]].gi,"fill",START,ACTIVE,(begin+(br-2)*d2),d1,1);
					
					// Animete opasity
										
						anm_opacity(edge[i],1,prc,(begin+(br-2)*d2),d1,1);
		
						set (edge[i], "stroke", EVISITED, (begin+(br-2)*d2));
					//Animate motion
					
  					cl = doc.createElement("circle");
  					cl.setAttribute("cx","0%");
  					cl.setAttribute("cy","0%");
  					cl.setAttribute("r","9");
  					cl.setAttribute("stroke","grey");
  					cl.setAttribute("fill","green");
  					cl.setAttribute("opacity",prc.toString(10)); 
  					objects.push(cl);
  					doc.getElementById("anim_nodes").appendChild(cl);
						
						anm_motion(cl,comes[i],tail[i],begin+(br-2)*d2,d2,0);
								
				}
				if ( i==0 )	{
				
				// Introduction animation
					 // Creating Cyrcle
					x = nodes[start].gi.getAttribute("cx");
					y = nodes[start].gi.getAttribute("cy");
					cl = doc.createElement("circle");
					cl.setAttribute("cx",x.toString(10));
					cl.setAttribute("cy",y.toString(10));
					cl.setAttribute("r","9");
					cl.setAttribute("stroke","grey");
					cl.setAttribute("fill","green");
					cl.setAttribute("opacity","0"); 
					objects.push(cl);
					doc.getElementById("anim_nodes").appendChild(cl);
					
					anm_opacity(cl,0,1,(begin+(br-2)*d2),d2,1);
				}
				
			if ( dir_mode==false )	{		
    			for ( j=0 ; j<nodes[tail[i]].elist.length ; j++ )	{
    				if ( edges[nodes[tail[i]].elist[j]].n1 != tail[i] &&
    				   		used[edges[nodes[tail[i]].elist[j]].n1] == 0 )	{
    					   		
    					tail[p3] = edges[nodes[tail[i]].elist[j]].n1;
    					edge[p3] = edges[nodes[tail[i]].elist[j]].gi;
    					used[edges[nodes[tail[i]].elist[j]].n1] = br;	
    					comes[p3] = edges[nodes[tail[i]].elist[j]].n2; 
    					p3++;
    					
    				} else	{
    					if ( edges[nodes[tail[i]].elist[j]].n2 != tail[i] &&
    							used[edges[nodes[tail[i]].elist[j]].n2] == 0 )	{
    								
    						tail[p3] = edges[nodes[tail[i]].elist[j]].n2;
    						edge[p3] = edges[nodes[tail[i]].elist[j]].gi;
    						used[edges[nodes[tail[i]].elist[j]].n2] = br;			
    						comes[p3] = edges[nodes[tail[i]].elist[j]].n1; 
    						p3++;
    					
    					}		
    				}	
    			}
			} else {
				for ( j=0 ; j<nodes[tail[i]].elist.length ; j++ )			 {
						if ( used[edges[nodes[tail[i]].elist[j]].n2]==0 )	 {
							 tail[p3] = edges[nodes[tail[i]].elist[j]].n2;
							 used[edges[nodes[tail[i]].elist[j]].n2] = br;
     					 comes[p3] = edges[nodes[tail[i]].elist[j]].n1;
							 edge[p3++] = edges[nodes[tail[i]].elist[j]].gi;
						}
				}
			}
		}
		prc = 0.827548*prc;
		p1 = p2;
		p2 = p3;		
	}while(p1 != p2);
	
}

/* Minimum Spanning Tree - Nikola Borisof */
function mst(n)	{
		var i, j, start, used, dis, an, treelen=0, brtree, next, edgesgi, tm, br;
		// time regulators
		var dur1=2,dur2=4,dur3=1.5;
		var
		used = new Array;				// 1 if already in Tree; 2 if still not
		dis = new Array;				// Distanse from the Tree
		edgesgi = new Array;			// edges grafic items
		
		begin = ((new Date()).valueOf() - time0)/1000;// + (br-1)*4;
	for ( i=0 ; i<nodes.length ; i++ )	{
		if ( n == nodes[i].gi )	{
			start = i;
			break;	
		}	
	}	
	for ( i=0 ; i<nodes.length ; i++ )	{
		used[i] = 0;
		dis[i] = 0;	
	}
	used[start] = 1;
	br = 1;
	for ( ; ; )	{
		
		/* Adds Starting Data */
		for ( i=0 ; i<nodes[start].elist.length ; i++ )	{
			
			if ( edges[nodes[start].elist[i]].n1 != start )	{
				
				if ( used[edges[nodes[start].elist[i]].n1] != 1 )	{
					
					tm = edges[nodes[start].elist[i]].n1;
					used[tm] = 2;
					if ( dis[tm] > edges[nodes[start].elist[i]].wei || dis[tm]==0 )	{
						
						dis[tm] = edges[nodes[start].elist[i]].wei;
						edgesgi[tm] = edges[nodes[start].elist[i]].gi;
						anm_color(edgesgi[tm],"stroke",EDEF,EACTIVE,(begin+(br-1)*dur2),dur3,1);
					}					
				}	
			} else	{
				if ( used[edges[nodes[start].elist[i]].n2] != 1 )	{
					tm = edges[nodes[start].elist[i]].n2;
					used[tm] = 2;
					if ( dis[tm] > edges[nodes[start].elist[i]].wei || dis[tm]==0 )	{
						dis[tm] = edges[nodes[start].elist[i]].wei;
						edgesgi[tm] = edges[nodes[start].elist[i]].gi;
						anm_color(edgesgi[tm],"stroke",EDEF,EACTIVE,(begin+(br-1)*dur2),dur3,1);
					}					
				}
			}
		}	
		do 	{
			/* Chose Next point to be add to the tree */
			
			next = -1;
			mindis = 1000000;
			for ( i=0 ; i<nodes.length ; i++ )	{
				if ( used[i] == 2 &&  dis[i]<mindis )	{
					mindis = dis[i];
					next = i;
				}	
			}	
			br++;
			
			if ( next != -1 )	{
				used[next] = 1;
				treelen +=dis[next];
				
				// Animate Colot Makes Red the new edges from the tree
				anm_color(edgesgi[next],"stroke",EVISITED,ETREE,(begin+(br-1)*dur2),dur1,1);
			
				/* Adds to the data the neighbours of the new Node */
				for ( i=0 ; i<nodes[next].elist.length ; i++ )	{
					if ( edges[nodes[next].elist[i]].n1 != next )	{
						if ( used[edges[nodes[next].elist[i]].n1] != 1 )	{
							
							tm = edges[nodes[next].elist[i]].n1;
							used[tm] = 2;
							if ( dis[tm] > edges[nodes[next].elist[i]].wei || dis[tm]==0 )	{
								
								dis[tm] = edges[nodes[next].elist[i]].wei;
								edgesgi[tm] = edges[nodes[next].elist[i]].gi;
										
								//Animation Color												
								anm_color(edgesgi[tm],"stroke",EDEF,EACTIVE,((begin+(br-1)*dur2)+2),dur3,1);

							}
						}	
					} else	{
						if ( used[edges[nodes[next].elist[i]].n2] != 1 )	{
							tm = edges[nodes[next].elist[i]].n2;
							used[tm] = 2;
							if ( dis[tm] > edges[nodes[next].elist[i]].wei || dis[tm]==0 )	{
				
								dis[tm] = edges[nodes[next].elist[i]].wei;
								edgesgi[tm] = edges[nodes[next].elist[i]].gi;
								
								//Animation Color												
								anm_color(edgesgi[tm],"stroke",EDEF,EACTIVE,((begin+(br-1)*dur2)+2),dur3,1);

							}
						}
					}
				}			
			}
		} while(next != -1);	
	
	bar("The total weight of the tree is: " +treelen.toString(10));
	break;	
		
		/* Choîse another starting point for another tree NOT AVAILABLE NOW!!! */
	}
}

// Oiler Nikola Borisof
function Oiler(evt)	{
		var i, j, startpoint, br, next, string, Stack, MyWay, usededges;
		var an, cl, cl1, x, y, x1, y1, x0, y0, dur1, dur2;
		startpoint = 0;	br = 0; dur1 = 3; dur2 = 4;
		string = "The Way  ";
		Stack = new Array;				// The stack ;)
		MyWay = new Array;				// Here is the Oiler Path
		usededges = new Array;			// if already used - 1 else 0
		begin = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
		
		// Init
		for ( i=0 ; i<edges.length ; i++ )	{
			usededges[i] = 0;	
		}
		
		// Checking...
		for ( i=0 ; i<nodes.length ; i++ )	{
			if ( dir_mode==false ) {
    			if ( nodes[i].elist.length %2 == 1 )	{
    				if ( br == 0 )	{
    					startpoint = i;
    				}
    				br++;
    			}
			} else {
				x = Math.abs(nodes[i].elist.length-nodes[i].relist.length);
				if ( x>1 ) br = 3;
				else if ( x==1 ) { br++; if ( nodes[i].elist.length >nodes[i].relist.length ) startpoint = i; }
			}
		}
		if ( br>2 )	{
			alert("NO PATH AVAILABLE");	
		} else {

			// Finding the Way
			Stack.push(startpoint);
			br = 0;
			do	{
				next = -1;
				for ( i=0 ; i<nodes[Stack[Stack.length-1]].elist.length ; i++ )	{
					if ( usededges[nodes[Stack[Stack.length-1]].elist[i]] == 0 )	{
						if ( edges[nodes[Stack[Stack.length-1]].elist[i]].n1 == Stack[Stack.length-1] )	{
							next = edges[nodes[Stack[Stack.length-1]].elist[i]].n2;
							usededges[nodes[Stack[Stack.length-1]].elist[i]] = 1;
							break;
						} else {
							next = edges[nodes[Stack[Stack.length-1]].elist[i]].n1;
							usededges[nodes[Stack[Stack.length-1]].elist[i]] = 1;
							break;
						}
					}
				}
				if ( next!=-1 )	{
					Stack.push(next);
				} else {
					MyWay.push(Stack[Stack.length-1]);
					Stack.pop();
					br++;
				}				
			}while(br<=edges.length);
			string+=MyWay[MyWay.length-1].toString(10);
			for ( i=MyWay.length-2 ; i>=0 ; i-- )	{
				string = string + ", " +MyWay[i].toString(10);	
			}
			
			// Starting animation. The point comes from nothing
			// Create Cyrcle
			x0 = nodes[MyWay[MyWay.length-1]].gi.getAttribute("cx");
			y0 = nodes[MyWay[MyWay.length-1]].gi.getAttribute("cy");
			cl = doc.createElement("circle");
			cl.setAttribute("cx",x0.toString(10));
			cl.setAttribute("cy",y0.toString(10));
			cl.setAttribute("r","9");
			cl.setAttribute("stroke","grey");
			cl.setAttribute("fill","green");
			cl.setAttribute("opacity","0"); 
			objects.push(cl);
			doc.getElementById("anim_nodes").appendChild(cl);
			// Animation			
			anm_opacity(cl,0,1,begin,dur2,0);
			
			cl1 = doc.createElement("circle");
			cl1.setAttribute("cx","0");
			cl1.setAttribute("cy","0");
			cl1.setAttribute("r","9");
			cl1.setAttribute("stroke","grey");
			cl1.setAttribute("fill","green");
			cl1.setAttribute("opacity","1"); 
			objects.push(cl1);
			doc.getElementById("anim_nodes").appendChild(cl1);
			
			for ( i=MyWay.length-2 ; i>=0 ; i-- )	{
				// Animate Motion from point MyWay[i+1] to point MyWay[i]
				
				anm_motion(cl1,MyWay[i+1],MyWay[i],(begin+dur2*(MyWay.length-i-1)),dur2,0);
			
				for ( j=0 ; j<nodes[MyWay[i+1]].elist.length ; j++ )	{
					if ( edges[nodes[MyWay[i+1]].elist[j]].n1 == MyWay[i] || edges[nodes[MyWay[i+1]].elist[j]].n2 == MyWay[i] )	{
						
						//Animate the edges color
						anm_color(edges[nodes[MyWay[i+1]].elist[j]].gi,"stroke",EACTIVE,EVISITED,(begin+dur2*(MyWay.length-i-1)),dur1,1);
						
						break;
					}
				}
			}
			
			// The cyrcle fades
			// Create Cyrcle
			x0 = nodes[MyWay[0]].gi.getAttribute("cx");
			y0 = nodes[MyWay[0]].gi.getAttribute("cy");
			cl = doc.createElement("circle");
			cl.setAttribute("cx",x0.toString(10));
			cl.setAttribute("cy",y0.toString(10));
			cl.setAttribute("r","9");
			cl.setAttribute("stroke","grey");
			cl.setAttribute("fill","green");
			cl.setAttribute("opacity","0"); 
			objects.push(cl);
			doc.getElementById("anim_nodes").appendChild(cl);
			// Animation
			anm_opacity(cl,1,0,(begin+dur2*(MyWay.length+1-1)),dur2,0);
			
			bar(string);			
		}
}

// Orientated S
function Os(a,b,c)	{
		 var x,y,x1,y1,x2,y2,s;
		 x = nodes[a].gi.getAttribute("cx");
		 y = nodes[a].gi.getAttribute("cy");
		 x1 = nodes[b].gi.getAttribute("cx");
		 y1 = nodes[b].gi.getAttribute("cy");
		 x2 = nodes[c].gi.getAttribute("cx");
		 y2 = nodes[c].gi.getAttribute("cy");
		 s = x*y1+y*x2+x1*y2-x*y2-y*x1-y1*x2;
 
		 if ( s<0 ) return -1;
		 if ( s==0 && y>y1 && y1>y2 ) return -1;
		 return 1;
}

/* Graham's Scan - Nikola Borisof */
function graham(evt) {
		var i,j;
		
		var start, maxx, maxy, ind, edge, line, buf,s;
		var dur1=1,dur2=5;
		ind = new Array;
		edge = new Array;			 					 	
		cover = new Array; 
		begin = ((new Date()).valueOf() - time0)/1000 + 1; 			// The time of the begining of Al.

		if ( geomet==false ) {
			 alert("First Change the Enviromet to Geometric");
			 return;
		}
		if ( nodes.length<1 )	 
			 alert("There should be altest one point");
					 
		// Finds the point that is down and write
		maxx=0; maxy=0;
		for ( i=0 ; i<nodes.length ; i++ )	{
				if ( parseInt(nodes[i].gi.getAttribute("cy"))>maxy )			{
					 start = i;
					 maxy = parseInt(nodes[i].gi.getAttribute("cy"));
					 maxx = parseInt(nodes[i].gi.getAttribute("cx"));
				} else if ( parseInt(nodes[i].gi.getAttribute("cy"))==maxy && parseInt(nodes[i].gi.getAttribute("cx"))>maxx )	{
					 start = i;
					 maxx = parseInt(nodes[i].gi.getAttribute("cx"));
				}
		}
		nodes[start].gi.setAttribute("fill","blue");
		ind[0] = start;
		for ( i=1 ; i<=start ; i++ ) 
				ind[i]=i-1;
		for ( ; i<nodes.length ; i++ )
				ind[i]=i;
	
		// Sorting the point by there angle
						
		for ( i=1 ; i<nodes.length-1 ; i++ ) {
				for ( j=1 ; j<nodes.length-1 ; j++ ) {
						if ( Os(ind[0],ind[j],ind[j+1])>0 ) {
							 buf = ind[j];
							 ind[j] = ind[j+1];
							 ind[j+1] = buf;
						}
				}
		}
		
		// Animating Building edges
		for ( i=1 ; i<nodes.length ; i++ ) {
				line = doc.createElement("line");
				line.setAttribute("x1",nodes[start].gi.getAttribute("cx").toString(10));
				line.setAttribute("y1",nodes[start].gi.getAttribute("cy").toString(10));
				line.setAttribute("x2",nodes[ind[i]].gi.getAttribute("cx").toString(10));
				line.setAttribute("y2",nodes[ind[i]].gi.getAttribute("cy").toString(10));
				line.setAttribute("stroke",ESTART);
    		line.setAttribute("stroke-width","2");
  			line.setAttribute("fill","none");
				line.setAttribute("opacity",0);
				objects.push(line);
				edge.push(line);
    		doc.getElementById("anim_nodes").appendChild(line);
				// Animation
				anm_opacity(line,0,1,begin+i*dur1,dur1,1);
		}
		cover.push(ind[0]);

		
		begin+=nodes.length*dur1;
		
		// Building the Hull
		for ( i=1 ; i<nodes.length ; i++ )	{
				anm_opacity(edge[i-1],1,0.2,begin,dur1,1);
				begin+=dur1;
				cover.push(ind[i]);
				anm_color(nodes[ind[i]].gi,"fill","black","blue",begin,dur1,1);
			
				line = doc.createElement("line");
				line.setAttribute("x1",nodes[cover[cover.length-1]].gi.getAttribute("cx").toString(10));
				line.setAttribute("y1",nodes[cover[cover.length-1]].gi.getAttribute("cy").toString(10));
				line.setAttribute("x2",nodes[cover[cover.length-2]].gi.getAttribute("cx").toString(10));
				line.setAttribute("y2",nodes[cover[cover.length-2]].gi.getAttribute("cy").toString(10));
				line.setAttribute("stroke",ETREE);
    		line.setAttribute("stroke-width","6");
  			line.setAttribute("fill","none");
				line.setAttribute("opacity",0);
				objects.push(line);
				edge.push(line);
    		doc.getElementById("anim_nodes").appendChild(line);
				// Animation
				anm_opacity(line,0,1,begin,dur1,1);
				begin+=dur1;
				
				while ( cover.length>=3 ) {
							
							line = doc.createElement("line");
      				line.setAttribute("x1",nodes[cover[cover.length-1]].gi.getAttribute("cx").toString(10));
      				line.setAttribute("y1",nodes[cover[cover.length-1]].gi.getAttribute("cy").toString(10));
      				line.setAttribute("x2",nodes[cover[cover.length-3]].gi.getAttribute("cx").toString(10));
      				line.setAttribute("y2",nodes[cover[cover.length-3]].gi.getAttribute("cy").toString(10));
      				line.setAttribute("stroke",ETREE);
          		line.setAttribute("stroke-width","2");
        			line.setAttribute("fill","none");
      				line.setAttribute("opacity",0);
      				objects.push(line);
      				edge.push(line);
          		doc.getElementById("anim_nodes").appendChild(line);
      				// Animation
      				anm_opacity(line,0,1,begin,dur1,1);
							begin+=dur1;
							
							if ( Os(cover[cover.length-3],cover[cover.length-2],cover[cover.length-1])>0 ) {
								 anm_color(nodes[cover[cover.length-2]].gi,"fill","black","red",begin,dur1,1);
								 anm_opacity(edge[edge.length-2],1,0,begin,dur1,1);
 								 anm_opacity(edge[edge.length-3],1,0,begin,dur1,1);
								 animate(edge[edge.length-1],"XML","stroke-width",2,6,begin,dur1,1);
								 edge[edge.length-3] = edge[edge.length-1];
								 edge.pop(); edge.pop();
								 begin+=dur1;
								 
								 cover[cover.length-2] = cover[cover.length-1];
								 cover.pop(); 
							} else {
								 anm_opacity(edge[edge.length-1],1,0,begin,dur1,1);
								 edge.pop();
								 break;
							}
				}				
		}
		// Adding the last Edge ot the Hull
		line = doc.createElement("line");
		line.setAttribute("x1",nodes[cover[cover.length-1]].gi.getAttribute("cx").toString(10));
		line.setAttribute("y1",nodes[cover[cover.length-1]].gi.getAttribute("cy").toString(10));
		line.setAttribute("x2",nodes[cover[0]].gi.getAttribute("cx").toString(10));
		line.setAttribute("y2",nodes[cover[0]].gi.getAttribute("cy").toString(10));
		line.setAttribute("stroke",ETREE);
    line.setAttribute("stroke-width","6");
  	line.setAttribute("fill","none");
		line.setAttribute("opacity",0);
		objects.push(line);
		edge.push(line);
    doc.getElementById("anim_nodes").appendChild(line);
		// Animation
		anm_opacity(line,0,1,begin,dur1,1);
		begin+=dur1;
		
		// Output the index of the nodes in the Hull
		s = cover[0].toString(10);
		for ( i=1 ; i<cover.length ; i++ ) {
				s=s+", "+cover[i].toString(10);
		}
		bar(s);
}

/* Jarvis's March - Nikola Borisof */
function jarvis(evt)  {
			var i,j;
			
			var maxx, maxy, start, used, next, cover, s, edge, begin;
			var dur1=0.5;
			used = new Array;
			cover = new Array;
			edge = new Array;
			begin = ((new Date()).valueOf() - time0)/1000 + 1; 			// The time of the begining of Al.
		
		for ( i=0 ; i<nodes.length ; i++ ) used[i]=0;	
			
		if ( geomet==false ) {
			 alert("First Change the Enviromet to Geometric");
			 return;
		}
		if ( nodes.length<1 )	 
			 alert("There should be altest one point");
					 
		// Finds the point that is down and rigth
		maxx=0; maxy=0;
		for ( i=0 ; i<nodes.length ; i++ )	{
				if ( parseInt(nodes[i].gi.getAttribute("cy"))>maxy )			{
					 start = i;
					 maxy = parseInt(nodes[i].gi.getAttribute("cy"));
					 maxx = parseInt(nodes[i].gi.getAttribute("cx"));
				} else if ( parseInt(nodes[i].gi.getAttribute("cy"))==maxy && parseInt(nodes[i].gi.getAttribute("cx"))>maxx )	{
					 start = i;
					 maxx = parseInt(nodes[i].gi.getAttribute("cx"));
				}
		}
		nodes[start].gi.setAttribute("fill","blue");
		
		next=-1;
		used[start] = 1;
		cover.push(start);
		do {
			 next = -1;
			 for ( i=0 ; i<nodes.length ; i++ )	{
 			 		 if ( next==-1 && used[i]==0  ) {
					 		next = i;
							break;
					 }
			 }
			 i++;
			 anm_color(nodes[next].gi,"fill","black","blue",begin,dur1,1);
			 begin+=dur1;
			 line = doc.createElement("line");
			 line.setAttribute("x1",nodes[cover[cover.length-1]].gi.getAttribute("cx").toString(10));
       line.setAttribute("y1",nodes[cover[cover.length-1]].gi.getAttribute("cy").toString(10));
       line.setAttribute("x2",nodes[next].gi.getAttribute("cx").toString(10));
       line.setAttribute("y2",nodes[next].gi.getAttribute("cy").toString(10));
       line.setAttribute("stroke",ETREE);
       line.setAttribute("stroke-width","6");
       line.setAttribute("fill","none");
       line.setAttribute("opacity",0);
       objects.push(line);
       edge.push(line);
       doc.getElementById("anim_nodes").appendChild(line);
			 anm_opacity(line,0,1,begin,dur1,1);
			 begin+=dur1;
			 
			 for ( ; i<nodes.length ; i++ ) {
			 		 if ( used[i]==0 )  {
					 
					 		 line = doc.createElement("line");
        			 line.setAttribute("x1",nodes[next].gi.getAttribute("cx").toString(10));
               line.setAttribute("y1",nodes[next].gi.getAttribute("cy").toString(10));
               line.setAttribute("x2",nodes[i].gi.getAttribute("cx").toString(10));
               line.setAttribute("y2",nodes[i].gi.getAttribute("cy").toString(10));
               line.setAttribute("stroke",ETREE);
               line.setAttribute("stroke-width","2");
               line.setAttribute("fill","none");
               line.setAttribute("opacity",0);
               objects.push(line);
               edge.push(line);
               doc.getElementById("anim_nodes").appendChild(line);
        			 anm_opacity(line,0,1,begin,dur1,1);
							 
							 line = doc.createElement("line");
        			 line.setAttribute("x1",nodes[cover[cover.length-1]].gi.getAttribute("cx").toString(10));
               line.setAttribute("y1",nodes[cover[cover.length-1]].gi.getAttribute("cy").toString(10));
               line.setAttribute("x2",nodes[i].gi.getAttribute("cx").toString(10));
               line.setAttribute("y2",nodes[i].gi.getAttribute("cy").toString(10));
               line.setAttribute("stroke",ETREE);
               line.setAttribute("stroke-width","2");
               line.setAttribute("fill","none");
               line.setAttribute("opacity",0);
               objects.push(line);
               edge.push(line);
               doc.getElementById("anim_nodes").appendChild(line);
        			 anm_opacity(line,0,1,begin,dur1,1);						 
							 
        			 begin+=dur1;
							 
    			 		 if ( Os(cover[cover.length-1],next,i)>0 ) {
									anm_color(nodes[next].gi,"fill","black","red",begin,dur1,1);
    					 		next = i;
									anm_color(nodes[next].gi,"fill","black","blue",begin,dur1,1);
									begin+=dur1;
									anm_opacity(edge[edge.length-2],1,0,begin,dur1,1);
									anm_opacity(edge[edge.length-3],1,0,begin,dur1,1);
									animate(edge[edge.length-1],"XML","stroke-width",2,6,begin,dur1,1);
									begin+=dur1;
									edge[edge.length-3] = edge[edge.length-1];
									edge.pop(); edge.pop();
									
    					 } else {
    					 	  anm_opacity(edge[edge.length-1],1,0,begin,dur1,1);
									anm_opacity(edge[edge.length-2],1,0,begin,dur1,1);
									begin+=dur1;
									edge.pop(); edge.pop();

    					 }
					 }
			 }		
			 if ( next!=-1 && next!=start ) {
			 		cover.push(next);
					used[next] = 1;
					used[start] = 0;
			 }
		}while( next!=-1 && next!=start );
		
		
		// Output the index of the nodes in the Hull
		s = cover[0].toString(10);
		for ( i=1 ; i<cover.length ; i++ ) {
				s=s+", "+cover[i].toString(10);
		}
		bar(s);
}

function dom(evt)  {
				 var i, j;
				 
				 var used, begin, stack, comes, cl;
				 var dur1=2, dur2=3;
				 
				 used = new Array;
				 stack = new Array;
				 comes = new Array;
				 ind = new Array;
				 begin = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
				 
				 for ( i=0 ; i<nodes.length ; i++ ) used[i]=0;
				 
      	cl = doc.createElement("circle");
        cl.setAttribute("cx","0%");
        cl.setAttribute("cy","0%");
        cl.setAttribute("r","6");
        cl.setAttribute("stroke","grey");
        cl.setAttribute("fill","white");
        cl.setAttribute("opacity","1"); 
        objects.push(cl);
        doc.getElementById("anim_nodes").appendChild(cl);
				 
				 for ( i=0 ; i<nodes.length ; i++ )  {
				 		 if ( used[i]==0 ) {
						 		anm_color(nodes[i].gi,"fill","black","blue",begin,dur1,1);
								animate(nodes[i].gi,"XML","r",4,9,begin,dur1,1);

								begin+=dur1;
								stack.push(i);
								comes.push(0);
								ind.push(0);
								used[i] = 3;
								while (stack.length)  {
											p = 0;
											v = stack[stack.length-1];
											if ( stack.length!=1 && used[v]==3 && ind[ind.length-1]==0 ) {
        									anm_motion(cl,comes[comes.length-1],stack[stack.length-1],begin,dur2,0);
        									begin+=dur2;
													anm_color(nodes[stack[stack.length-1]].gi,"fill",START,ACTIVE,begin,dur1,1);
													begin+=dur1;
											}
											j = ind[ind.length-1];
											for (  ; j<nodes[v].elist.length ; j++ )  {
													if ( dir_mode==true )	{
            						 		if ( used[edges[nodes[v].elist[j]].n2]==0 || used[edges[nodes[v].elist[j]].n2]==1 )	{
															  p=1;
																stack.push(edges[nodes[v].elist[j]].n2);
																comes.push(v);
																ind.push(0);
																used[edges[nodes[v].elist[j]].n2] = 3;
																break;
            								} else if ( used[edges[nodes[v].elist[j]].n2]==2 ) {
															anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,0);
															begin+=dur2;
            									anm_color(nodes[edges[nodes[v].elist[j]].n2].gi,"fill","black",ACTIVE,begin,dur1,1);
              								animate(nodes[edges[nodes[v].elist[j]].n2].gi,"XML","r",9,6,begin,dur1,1);
              								begin+=dur1;
															anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,1);
															begin+=dur2;
            									used[edges[nodes[v].elist[j]].n2]=4;
            								}
            						 } else {
            						 	 if ( edges[nodes[v].elist[j]].n1==v ) {
            							 		if ( used[edges[nodes[v].elist[j]].n2]==0 || used[edges[nodes[v].elist[j]].n2]==1 )	{
															   p=1;
																 comes.push(v);           								
																 stack.push(edges[nodes[v].elist[j]].n2);
																 ind.push(0);
  															 used[edges[nodes[v].elist[j]].n2] = 3;
																 break;
              								} else if ( used[edges[nodes[v].elist[j]].n2]==2 ) {
															  anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,0);
																begin+=dur2;
            										anm_color(nodes[edges[nodes[v].elist[j]].n2].gi,"fill","black",ACTIVE,begin,dur1,1);
                  							animate(nodes[edges[nodes[v].elist[j]].n2].gi,"XML","r",9,6,begin,dur1,1);
                  							begin+=dur1;
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,1);
																begin+=dur2;
              									used[edges[nodes[v].elist[j]].n2]=4;
              								}
            							 } else {
            							 	 	if ( used[edges[nodes[v].elist[j]].n1]==0 || used[edges[nodes[v].elist[j]].n2]==1 )	{
															   p=1;
  															 comes.push(v);
																 stack.push(edges[nodes[v].elist[j]].n1);
																 ind.push(0);
																 used[edges[nodes[v].elist[j]].n1] = 3;
																 break;
                  						} else if ( used[edges[nodes[v].elist[j]].n1]==2 ) {
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n1,begin,dur2,0);
																begin+=dur2;
            										anm_color(nodes[edges[nodes[v].elist[j]].n1].gi,"fill","black",ACTIVE,begin,dur1,1);
                								animate(nodes[edges[nodes[v].elist[j]].n1].gi,"XML","r",9,6,begin,dur1,1);
                								begin+=dur1;
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n1,begin,dur2,1);
																begin+=dur2;
                  							used[edges[nodes[v].elist[j]].n1]=4;
                  						}
            							 }
            						 }
											}
											
											if ( p==0 ) {
												 if ( stack.length!=1 && used[v]==3 ) {
    												 anm_motion(cl,comes[comes.length-1],stack[stack.length-1],begin,dur2,1);
    												 begin+=dur2;
												 }
												 used[v] = 4;
												 stack.pop();
												 comes.pop();
												 ind.pop();
											} else {
												 ind[ind.length-2] = j+1;
											}
								}
								for ( j=0 ; j<nodes.length ; j++ ) {
										if ( used[j]==4 ) used[j] = 1;
								}
								used[i] = 2;
						 }
				 }
}

function co_dom(evt) {
  var i, j;
				 
	var used, begin, stack, comes, cl;
	var dur1=2, dur2=3;
					 
				 used = new Array;
				 stack = new Array;
				 comes = new Array;
				 ind = new Array;
				 begin = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
				 
				 for ( i=0 ; i<nodes.length ; i++ ) used[i]=0;
				 
      	cl = doc.createElement("circle");
        cl.setAttribute("cx","0%");
        cl.setAttribute("cy","0%");
        cl.setAttribute("r","6");
        cl.setAttribute("stroke","grey");
        cl.setAttribute("fill","white");
        cl.setAttribute("opacity","1"); 
        objects.push(cl);
        doc.getElementById("anim_nodes").appendChild(cl);
				 

				 for ( i=0 ; i<nodes.length ; i++ )  {
				 		 if ( used[i]==0 ) {
						 		anm_color(nodes[i].gi,"fill","black","blue",begin,dur1,1);
								animate(nodes[i].gi,"XML","r",4,9,begin,dur1,1);

								begin+=dur1;
								stack.push(i);
								comes.push(0);
								ind.push(0);
								used[i] = 3;
								while (stack.length)  {

											p = 0;
											v = stack[stack.length-1];

											if ( stack.length!=1 && used[v]==3 && ind[ind.length-1]==0 ) {

        									if ( dir_mode==true )
													 anm_motion(cl,stack[stack.length-1],comes[comes.length-1],begin,dur2,1);
													else
													 anm_motion(cl,comes[comes.length-1],stack[stack.length-1],begin,dur2,0);
        									begin+=dur2;
													anm_color(nodes[stack[stack.length-1]].gi,"fill",START,ACTIVE,begin,dur1,1);
													begin+=dur1;
											}
											j = ind[ind.length-1];
											if ( dir_mode==true )	{
													for (  ; j<nodes[v].relist.length ; j++ )  {
            						 		if ( used[edges[nodes[v].relist[j]].n1]==0 || used[edges[nodes[v].relist[j]].n1]==1 )	{
															  p=1;
																stack.push(edges[nodes[v].relist[j]].n1);
																comes.push(v);
																ind.push(0);
																used[edges[nodes[v].relist[j]].n1] = 3;
																break;
            								} else if ( used[edges[nodes[v].relist[j]].n1]==2 ) {

															anm_motion(cl,edges[nodes[v].relist[j]].n1,stack[stack.length-1],begin,dur2,1);
															begin+=dur2;
            									anm_color(nodes[edges[nodes[v].relist[j]].n1].gi,"fill","black",ACTIVE,begin,dur1,1);
              								animate(nodes[edges[nodes[v].relist[j]].n1].gi,"XML","r",9,6,begin,dur1,1);
              								begin+=dur1;

															anm_motion(cl,edges[nodes[v].relist[j]].n1,stack[stack.length-1],begin,dur2,0);
															begin+=dur2;
            									used[edges[nodes[v].relist[j]].n1]=4;
            								}
            						 } 
											 } else {
											 	 for ( ; j<nodes.length ; j++ ) {
            						 	 if ( edges[nodes[v].elist[j]].n1==v ) {
            							 		if ( used[edges[nodes[v].elist[j]].n2]==0 || used[edges[nodes[v].elist[j]].n2]==1 )	{
															   p=1;
																 comes.push(v);           								
																 stack.push(edges[nodes[v].elist[j]].n2);
																 ind.push(0);
  															 used[edges[nodes[v].elist[j]].n2] = 3;
																 break;
              								} else if ( used[edges[nodes[v].elist[j]].n2]==2 ) {
															  anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,0);
																begin+=dur2;
            										anm_color(nodes[edges[nodes[v].elist[j]].n2].gi,"fill","black",ACTIVE,begin,dur1,1);
                  							animate(nodes[edges[nodes[v].elist[j]].n2].gi,"XML","r",9,6,begin,dur1,1);
                  							begin+=dur1;
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n2,begin,dur2,1);
																begin+=dur2;
              									used[edges[nodes[v].elist[j]].n2]=4;
              								}
            							 } else {
            							 	 	if ( used[edges[nodes[v].elist[j]].n1]==0 || used[edges[nodes[v].elist[j]].n2]==1 )	{
															   p=1;
  															 comes.push(v);
																 stack.push(edges[nodes[v].elist[j]].n1);
																 ind.push(0);
																 used[edges[nodes[v].elist[j]].n1] = 3;
																 break;
                  						} else if ( used[edges[nodes[v].elist[j]].n1]==2 ) {
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n1,begin,dur2,0);
																begin+=dur2;
            										anm_color(nodes[edges[nodes[v].elist[j]].n1].gi,"fill","black",ACTIVE,begin,dur1,1);
                								animate(nodes[edges[nodes[v].elist[j]].n1].gi,"XML","r",9,6,begin,dur1,1);
                								begin+=dur1;
																anm_motion(cl,stack[stack.length-1],edges[nodes[v].elist[j]].n1,begin,dur2,1);
																begin+=dur2;
                  							used[edges[nodes[v].elist[j]].n1]=4;
                  						}
            							 }
            						 }
											}
											
											if ( p==0 ) {
												 if ( stack.length!=1 && used[v]==3 ) {

												 		if ( dir_mode==true )
    												 anm_motion(cl,stack[stack.length-1],comes[comes.length-1],begin,dur2,0);
														else
														 anm_motion(cl,stack[stack.length-1],comes[comes.length-1],begin,dur2,1);
    												begin+=dur2;
												 }
												 used[v] = 4;
												 stack.pop();
												 comes.pop();
												 ind.pop();
											} else {
												 ind[ind.length-2] = j+1;
											}
								}
								for ( j=0 ; j<nodes.length ; j++ ) {
										if ( used[j]==4 ) used[j] = 1;
								}
								used[i] = 2;
						 }
				 }
}


/* Max Flow Algoritams - Nikola Borisof*/

/* Max Flow with BFS */
function flow_bfs(point)  {
   var i,j,p1,p2,p3,x, end_p_txt;
	 
	 var p, maxflow=0, curflow=0, cl, txt, begin, dur1=3, el, etxt, dur2 = 1.5;
	 
	 var tail, used, comes, flow, edgeslen, edgetxt, els;
	 tail = new Array;
	 used = new Array;
	 comes = new Array;
	 flow = new Array;
	 edgeslen = new Array;
	 edgetxt = new Array;
	 els = new Array;
	 begin = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
	 
	 
  if ( is_flow==0 ) {
		 for ( i=0 ; i<nodes.length&&point!=nodes[i].gi ; i++ );
		 start_p = i;
		 animate(nodes[start_p].gi,"XML","r",6,12,begin,dur1,1);
		 anm_color(nodes[start_p].gi,"fill",START,ACTIVE,begin,dur1,1);
		 start_p_txt = label_node(start_p,0,"black","black",0);
		 begin+=dur1;
		 is_flow++;

		 return;
	} else {
		 for ( i=0 ; i<nodes.length&&point!=nodes[i].gi ; i++ );
		 end_p = i;
 		 animate(nodes[end_p].gi,"XML","r",6,12,begin,dur1,1);
		 anm_color(nodes[end_p].gi,"fill",START,ACTIVE,begin,dur1,1);
		 end_p_txt = label_node(end_p,0,"black","black",0);
 		 begin+=dur1;

		 if ( start_p!=end_p ) {
		 	  is_flow=0;
		 } else {
		 	  alert("Chouse another End Point Difrent from the Start Point");
				return;
		 }
		 // Start the algorithm

		 // Adding the needed edges
		 bul=0;
		 if ( dir_mode==false ) {
		 		alert("You should first change the graph to directed!!!");
				return;
		 } else {
		 	 for ( i=0 ; i<path_edges ; i++ ) {
			 		p=0;
			    for ( j=path_edges ; j<edges.length ; j++ ) {
					   if ( edges[i].n1==edges[j].n2 && edges[i].n2==edges[j].n1 ) {
						 		p=1; break;
						 }
					}
					if ( p==0 ) {
					   // Adding edge with flow 0 and oposit direction to edges[i]
						 c1 = nodes[edges[i].n2].gi;
						 aef = 2;
						 add_edge(nodes[edges[i].n1].gi);
						 fake_edge.push(edges[edges.length-1].gi);
					}
			 }
		 }
		 bul=1;
		 // Save the real edge lens And create the new elipses for the edge length-s
		 for ( i=0 ; i<edges.length ; i++ ) {
		 		 edges[i].weigi.setAttribute("opacity","0");
 		 		 edges[i].rectgi.setAttribute("opacity","0");
		 		 edgeslen.push(edges[i].wei);
				 el = make_ellipse(parseInt(edges[i].rectgi.getAttribute("x"))+20,parseInt(edges[i].rectgi.getAttribute("y"))+11,25,10,"red","blue",1,0.8);
				 objects.push(el);
				 els.push(el);
         doc.getElementById("anim_nodes").appendChild(el);
				 etxt = label_node3(el,edges[i].wei,"black","black",0);
				 edgetxt.push(etxt);
		 }
		 
		 // The real algorithm
		 do {
		    // Inits
				for ( i=0 ; i<nodes.length ; i++ ) {
				   used[i]=0;
				}
				for ( i=0 ; i<edges.length ; i++ ) {
						set(edges[i].gi,"stroke",ESTART,begin);
				}
				for ( i=tail.length-1 ; i>=0 ; i-- ) {
						tail.pop();
						comes.pop();
						flow.pop();
				}
				tail.push(start_p);
				comes.push(-1);
				flow.push(200000);
				used[start_p]=1;
				p1 = 0; p2 = p3 = 1;
				curflow=0;

				
				// Finding a flow with BFS
				do {
				   for ( i=p1 ; i<p2 ; i++ ) {
					 		 for ( j=0 ; j<nodes[tail[i]].elist.length ; j++ ) {
							    if ( used[edges[nodes[tail[i]].elist[j]].n2]==0 && edgeslen[nodes[tail[i]].elist[j]]>0 ) {
									   tail.push(edges[nodes[tail[i]].elist[j]].n2);
										 comes.push(i);
										 if ( edgeslen[nodes[tail[i]].elist[j]] < flow[i]) {
										   flow.push(edgeslen[nodes[tail[i]].elist[j]]);
										 } else {
										   flow.push(flow[i]);
										 }

										 used[edges[nodes[tail[i]].elist[j]].n2] = 1;
										 cl = cyrcle(0,0,9,"grey","green",1);
										 txt = label_node3(cl,flow[flow.length-1],"white","black",0);
										 anm_motion(cl,tail[i],edges[nodes[tail[i]].elist[j]].n2,begin,dur1,0);
										 anm_motion(txt,tail[i],edges[nodes[tail[i]].elist[j]].n2,begin,dur1,0);
										 anm_color(edges[nodes[tail[i]].elist[j]].gi,"stroke",ESTART,EACTIVE,begin,dur1,1);
										 p3++;
									}
							 }
					 }
					 p1 = p2;
					 p2 = p3;
					 begin+=dur1;
				}while(p1!=p2&&used[end_p]==0);
				
				// Finds the index int the tail of the end_p
				for ( i=tail.length-1 ; i>=0&&tail[i]!=end_p ; i-- );
		    x = i;

				if ( i>0 ) {
				   curflow = flow[i];
				}
				 
				// Changing the weigth of the edges
				if ( curflow!=0 ) {
					 					 maxflow+=curflow;
										 
					 cl = cyrcle(0,0,9,"grey","green",1);
					 txt = label_node3(cl,flow[x],"white","black",0);
					 cl1 = cyrcle(0,0,9,"grey","green",1);
					 txt1 = label_node3(cl1,flow[x],"white","black",0);
					 
					 set(end_p_txt,"opacity","0",begin);
					 end_p_txt = label_node(end_p,maxflow,"black","black",0);
					 end_p_txt.setAttribute("opacity","0");
					 set(end_p_txt,"opacity","1",begin);
				   while ( comes[x]!=-1 ) {
	
					 			 anm_motion(cl,tail[comes[x]],tail[x],begin,dur1,1);
								 anm_motion(txt,tail[comes[x]],tail[x],begin,dur1,1);
 					 			 anm_motion(cl1,tail[x],tail[comes[x]],begin,dur1,0);
								 anm_motion(txt1,tail[x],tail[comes[x]],begin,dur1,0);
								 
								 for ( j=0 ; j<nodes[tail[comes[x]]].elist.length&&edges[nodes[tail[comes[x]]].elist[j]].n2!=tail[x] ; j++ );
								 anm_color(edges[nodes[tail[comes[x]]].elist[j]].gi,"stroke",EACTIVE,EVISITED,begin,dur1,1);
								 anm_opacity(edgetxt[nodes[tail[comes[x]]].elist[j]],1,0,begin,dur2,1);
 	  						 edgeslen[nodes[tail[comes[x]]].elist[j]] -=curflow;

								 etxt = label_node3(els[nodes[tail[comes[x]]].elist[j]],edgeslen[nodes[tail[comes[x]]].elist[j]],"black","black",0);
								 etxt.setAttribute("opacity","0");
 								 edgetxt[nodes[tail[comes[x]]].elist[j]] = etxt;
								 anm_opacity(edgetxt[nodes[tail[comes[x]]].elist[j]],0,1,begin+dur2,dur2,1);
								 
								 for ( j=0 ; j<nodes[tail[x]].elist.length&&edges[nodes[tail[x]].elist[j]].n2!=tail[comes[x]] ; j++ );
								 anm_color(edges[nodes[tail[x]].elist[j]].gi,"stroke",EACTIVE,EVISITED,begin,dur1,1);
								 anm_opacity(edgetxt[nodes[tail[x]].elist[j]],1,0,begin,dur2,1);
								 
								 edgeslen[nodes[tail[x]].elist[j]] += curflow;
								 etxt = label_node3(els[nodes[tail[x]].elist[j]],edgeslen[nodes[tail[x]].elist[j]],"black","black",0);
								 etxt.setAttribute("opacity","0");
 								 edgetxt[nodes[tail[x]].elist[j]] = etxt;
								 anm_opacity(edgetxt[nodes[tail[x]].elist[j]],0,1,begin+dur2,dur2,1);
								 begin+=dur2*2;								 

								 x = comes[x];				 
					 }
					 set(start_p_txt,"opacity","0",begin);

					 start_p_txt = label_node(start_p,parseInt((-maxflow)),"black","black",0);
					 start_p_txt.setAttribute("opacity","0");
					 set(start_p_txt,"opacity","1",begin);
				}
				
		 }while(curflow!=0);
		 bar("Max Flow is "+maxflow.toString(10));
				
	}
}

function flow_dfs(n) {
	var i,j;
	
	var begin, el, etxt, cur_flow=0;
	edgeslen = new Array;
	used_dfs = new Array;
	els = new Array;
	edgetxt = new Array;
  begin_dfs = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
	
  if ( is_flow==0 ) {
		 for ( i=0 ; i<nodes.length&&n!=nodes[i].gi ; i++ );
		 start_p = i;
		 animate(nodes[start_p].gi,"XML","r",6,12,begin_dfs,dur1_dfs,1);
		 anm_color(nodes[start_p].gi,"fill",START,ACTIVE,begin_dfs,dur1_dfs,1);
		 start_p_txt = label_node(start_p,0,"black","black",0);
		 begin_dfs+=dur1_dfs;
		 is_flow++;

		 return;
	} else {
		 for ( i=0 ; i<nodes.length&&n!=nodes[i].gi ; i++ );
		 end_p = i;
 		 animate(nodes[end_p].gi,"XML","r",6,12,begin_dfs,dur1_dfs,1);
		 anm_color(nodes[end_p].gi,"fill",START,ACTIVE,begin_dfs,dur1_dfs,1);
		 end_p_txt = label_node(end_p,0,"black","black",0);
 		 begin_dfs+=dur1_dfs;

		 if ( start_p!=end_p ) {
		 	  is_flow=0;
		 } else {
		 	  alert("Chouse another End Point Difrent from the Start Point");
				return;
		 }
		 // Start the algorithm

		 // Adding the needed edges
		 bul=0;
		 if ( dir_mode==false ) {
		 		alert("You should first change the graph to directed!!!");
				return;
		 } else {
		 	 for ( i=0 ; i<path_edges ; i++ ) {
			 		p=0;
			    for ( j=path_edges ; j<edges.length ; j++ ) {
					   if ( edges[i].n1==edges[j].n2 && edges[i].n2==edges[j].n1 ) {
						 		p=1; break;
						 }
					}
					if ( p==0 ) {
					   // Adding edge with flow 0 and oposit direction to edges[i]
						 c1 = nodes[edges[i].n2].gi;
						 aef = 2;
						 add_edge(nodes[edges[i].n1].gi);
						 fake_edge.push(edges[edges.length-1].gi);
					}
			 }
		 }
		 bul=1;
		 // Save the real edge lens And create the new elipses for the edge length-s
		 for ( i=0 ; i<edges.length ; i++ ) {
		 		 edges[i].weigi.setAttribute("opacity","0");
 		 		 edges[i].rectgi.setAttribute("opacity","0");
		 		 edgeslen.push(edges[i].wei);
				 el = make_ellipse(parseInt(edges[i].rectgi.getAttribute("x"))+20,parseInt(edges[i].rectgi.getAttribute("y"))+11,25,10,"red","blue",1,0.8);
				 objects.push(el);
				 els.push(el);
         doc.getElementById("anim_nodes").appendChild(el);
				 etxt = label_node3(el,edges[i].wei,"black","black",0);
				 edgetxt.push(etxt);
		 }
		 

		 do  {
		 		 for ( i=0 ; i<nodes.length ; i++ ) {
				    used_dfs[i]=0;
				 }
		 		 cur_flow = flow_dfs_(start_p,20000);
				 set(start_p_txt,"opacity","0",begin_dfs);

    		 start_p_txt = label_node(start_p,(-max_flow),"black","black",0);
    		 start_p_txt.setAttribute("opacity","0");
    		 set(start_p_txt,"opacity","1",begin_dfs);
		 }while(cur_flow!=0);
		 
		 bar("Max Flow is "+max_flow.toString(10));
	}
	max_flow=0;
}

function flow_dfs_(v,flow) {
	 var i, j, cl, txt=null, flow1=0, etxt;
  	 
   used_dfs[v]=1;
	 if ( v==end_p) {
	 		set(end_p_txt,"opacity","0",begin_dfs);
			max_flow+=flow;
			end_p_txt = label_node(end_p,max_flow,"black","black",0);
			end_p_txt.setAttribute("opacity","0");
			set(end_p_txt,"opacity","1",begin_dfs);
			return flow;
	 }
	 // Create cyrcle
	 cl = cyrcle(0,0,9,"grey","green",1);
	 
	 for ( i=0 ; i<nodes[v].elist.length ; i++ ) {
	 		 if ( used_dfs[edges[nodes[v].elist[i]].n2]==0 && edgeslen[nodes[v].elist[i]]>0 ) {
			 		// Animate
					if ( txt!=null ) {
						 set(txt,"opacity","0",begin_dfs);
					}
					if ( flow<edgeslen[nodes[v].elist[i]] ) {
					   flow1 = flow;
					} else {
					   flow1 = edgeslen[nodes[v].elist[i]];					
					}

					txt = label_node3(cl,flow1,"white","black",0);
					txt.setAttribute("opacity","0");
					set(txt,"opacity","1",begin_dfs);
					anm_motion(cl,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,0);
					anm_motion(txt,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,0);
					anm_color(edges[nodes[v].elist[i]].gi,"stroke",ESTART,EACTIVE,begin_dfs,dur1_dfs,1);
					anm_color(nodes[edges[nodes[v].elist[i]].n2].gi,"fill",ESTART,EACTIVE,begin_dfs,dur1_dfs,1);
					begin_dfs+=dur1_dfs;
					reflow = flow_dfs_(edges[nodes[v].elist[i]].n2,flow1);
					if ( reflow==0 ) {
						  anm_motion(cl,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,1);
						  anm_motion(txt,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,1);
							anm_color(edges[nodes[v].elist[i]].gi,"stroke",EACTIVE,EVISITED,begin_dfs,dur1_dfs,1);
    					anm_color(nodes[edges[nodes[v].elist[i]].n2].gi,"fill",EACTIVE,EVISITED,begin_dfs,dur1_dfs,1);
 	 					  begin_dfs+=dur1_dfs;
					} else {
    					txt = label_node3(cl,reflow,"white","black",0);
							txt.setAttribute("opacity","0");
							set(txt,"opacity","1",begin_dfs);
						  anm_motion(cl,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,1);
						  anm_motion(txt,v,edges[nodes[v].elist[i]].n2,begin_dfs,dur1_dfs,1);
							anm_color(edges[nodes[v].elist[i]].gi,"stroke",EACTIVE,EVISITED,begin_dfs,dur1_dfs,1);
    					anm_color(nodes[edges[nodes[v].elist[i]].n2].gi,"fill",EACTIVE,EVISITED,begin_dfs,dur1_dfs,1);

							
						  cl = cyrcle(0,0,9,"grey","green",1);
    					txt = label_node3(cl,reflow,"white","black",0);
							txt.setAttribute("opacity","0");
							set(txt,"opacity","1",begin_dfs);
							anm_motion(cl,edges[nodes[v].elist[i]].n2,v,begin_dfs,dur1_dfs,0);
						  anm_motion(txt,edges[nodes[v].elist[i]].n2,v,begin_dfs,dur1_dfs,0);

							edgeslen[nodes[v].elist[i]]-=reflow;
							for ( j=0 ; j<nodes[edges[nodes[v].elist[i]].n2].elist.length&&edges[nodes[edges[nodes[v].elist[i]].n2].elist[j]].n2!=v ; j++ );
							edgeslen[nodes[edges[nodes[v].elist[i]].n2].elist[j]]+=reflow;
							anm_color(edges[nodes[edges[nodes[v].elist[i]].n2].elist[j]].gi,"stroke",EACTIVE,EVISITED,begin_dfs,dur1_dfs,1);
							anm_opacity(edgetxt[nodes[v].elist[i]],1,0,begin_dfs,dur1_dfs/2,1);
							anm_opacity(edgetxt[nodes[edges[nodes[v].elist[i]].n2].elist[j]],1,0,begin_dfs,dur1_dfs/2,1);
							begin_dfs+=dur1_dfs/2;
							
							etxt = label_node3(els[nodes[v].elist[i]],edgeslen[nodes[v].elist[i]],"white","black",0);
							edgetxt[nodes[v].elist[i]] = etxt;
							etxt.setAttribute("opacity","0");
							anm_opacity(etxt,0,1,begin_dfs,dur1_dfs/2,1);
							
							etxt = label_node3(els[nodes[edges[nodes[v].elist[i]].n2].elist[j]],edgeslen[nodes[edges[nodes[v].elist[i]].n2].elist[j]],"white","black",0);
							edgetxt[nodes[edges[nodes[v].elist[i]].n2].elist[j]] = etxt;
							etxt.setAttribute("opacity","0");							
							anm_opacity(etxt,0,1,begin_dfs,dur1_dfs/2,1);
							begin_dfs+=dur1_dfs/2;
							return reflow;
					}
			 }
	 }
	 return 0;
}
function minn(a,b) {
				 if ( a < b ) {
				 		return a;
				 } else return b;
}

function flow_dijkstra(n) {
  var i,j,next;
	
	var begin, el, etxt, cur_flow=0, dur1=3, dur2=1.5;
	var dis, used, comes, maxint=200000, cl, txt, cl1, txt1, e1, e2;
	edgeslen = new Array;
	used = new Array;
	dis = new Array;
	comes = new Array;
	els = new Array;
	edgetxt = new Array;
  begin = ((new Date()).valueOf() - time0)/1000; 			// The time of the begining of Al.
	
  if ( is_flow==0 ) {
		 for ( i=0 ; i<nodes.length&&n!=nodes[i].gi ; i++ );
		 start_p = i;
		 animate(nodes[start_p].gi,"XML","r",6,12,begin,dur1,1);
		 anm_color(nodes[start_p].gi,"fill",START,ACTIVE,begin,dur1,1);
		 start_p_txt = label_node(start_p,0,"black","black",0);
		 begin+=dur1;
		 is_flow++;

		 return;
	} else {
		 for ( i=0 ; i<nodes.length&&n!=nodes[i].gi ; i++ );
		 end_p = i;
 		 animate(nodes[end_p].gi,"XML","r",6,12,begin,dur1,1);
		 anm_color(nodes[end_p].gi,"fill",START,ACTIVE,begin,dur1,1);
		 end_p_txt = label_node(end_p,0,"black","black",0);
 		 begin+=dur1;

		 if ( start_p!=end_p ) {
		 	  is_flow=0;
		 } else {
		 	  alert("Chouse another End Point Difrent from the Start Point");
				return;
		 }
		 // Start the algorithm

		 // Adding the needed edges
		 bul=0;
		 if ( dir_mode==false ) {
		 		alert("You should first change the graph to directed!!!");
				return;
		 } else {
		 	 for ( i=0 ; i<path_edges ; i++ ) {
			 		p=0;
			    for ( j=path_edges ; j<edges.length ; j++ ) {
					   if ( edges[i].n1==edges[j].n2 && edges[i].n2==edges[j].n1 ) {
						 		p=1; break;
						 }
					}
					if ( p==0 ) {
					   // Adding edge with flow 0 and oposit direction to edges[i]
						 c1 = nodes[edges[i].n2].gi;
						 aef = 2;
						 add_edge(nodes[edges[i].n1].gi);
						 fake_edge.push(edges[edges.length-1].gi);
					}
			 }
		 }
		 bul=1;
		 // Save the real edge lens And create the new elipses for the edge length-s
		 for ( i=0 ; i<edges.length ; i++ ) {
		 		 edges[i].weigi.setAttribute("opacity","0");
 		 		 edges[i].rectgi.setAttribute("opacity","0");
		 		 edgeslen.push(edges[i].wei);
				 el = make_ellipse(parseInt(edges[i].rectgi.getAttribute("x"))+20,parseInt(edges[i].rectgi.getAttribute("y"))+11,25,10,"red","blue",1,0.8);
				 objects.push(el);
				 els.push(el);
         doc.getElementById("anim_nodes").appendChild(el);
				 etxt = label_node3(el,edges[i].wei,"black","black",0);
				 edgetxt.push(etxt);
		 }
		//Dijkstra
		
		//work
	do {
	  //Inin
		for ( i=0 ; i<nodes.length ; i++ ) {
				dis[i]=0;
				used[i]=0;
				comes[i]=0;
				if ( i!=start_p && i!=end_p )
						set(nodes[i].gi,"fill",START,begin);
		}
		for ( i=0 ; i<edges.length ; i++ ) {
				set(edges[i].gi,"stroke",ESTART,begin);
		}
		dis[start_p]=200000;
		comes[start_p]=-1;
		next = start_p;
		
		do {
			 used[next] = 1;
			 for ( i=0 ; i<nodes[next].elist.length ; i++ ) {
			 		 if ( used[edges[nodes[next].elist[i]].n2]==0 
					     && dis[edges[nodes[next].elist[i]].n2]<minn(dis[next],edgeslen[nodes[next].elist[i]]) ) {
					 		 dis[edges[nodes[next].elist[i]].n2] = minn(dis[next],edgeslen[nodes[next].elist[i]]);
							 comes[edges[nodes[next].elist[i]].n2] = next;
							 
							 // Animation
							 if ( edges[nodes[next].elist[i]].n2!=end_p )
   							 animate(nodes[edges[nodes[next].elist[i]].n2].gi,"XML","r",10,6,begin,dur2,1);
							 anm_color(nodes[edges[nodes[next].elist[i]].n2].gi,"fill",START,ACTIVE,begin,dur2,1);
							 begin+=dur2;
					 }
			 } 
			 maxx = 0; next = -1;
			 for ( i=0 ; i<nodes.length ; i++ ) {
			 		 if ( used[i]==0 && dis[i]>maxx ) {
					 		next = i;
							maxx = dis[i]; 
					 }
			 }
			 if ( next!=-1 ) {
			 		// Animation
					cl = cyrcle(0,0,9,"grey","green",1);
 					txt = label_node3(cl,dis[next],"white","black",0);
					txt.setAttribute("opacity","0");
					set(txt,"opacity","1",begin);
					anm_motion(cl,comes[next],next,begin,dur1,0);
				  anm_motion(txt,comes[next],next,begin,dur1,0);
					if ( next!=end_p )
    					animate(nodes[next].gi,"XML","r",12,6,begin,dur1,0);
					anm_color(nodes[next].gi,"fill",ACTIVE,VISITED,begin,dur1,1);
					begin+=dur1;				  
			 }
		}while(next!=-1&&next!=end_p);
		
		cur_flow = dis[end_p];
		
		if ( cur_flow!=0 ) {
			 max_flow+=cur_flow;
			 set(end_p_txt,"opacity","0",begin);
  		 end_p_txt = label_node(end_p,max_flow,"black","black",0);
  		 end_p_txt.setAttribute("opacity","0");
  		 set(end_p_txt,"opacity","1",begin);
			 
			 cl = cyrcle(0,0,9,"grey","green",1);
 			 txt = label_node3(cl,cur_flow,"white","black",0);
			 cl1 = cyrcle(0,0,9,"grey","green",1);
			 txt1 = label_node3(cl1,cur_flow,"white","black",0);
			 txt.setAttribute("opacity","0");
			 txt1.setAttribute("opacity","0");
			 set(txt,"opacity","1",begin);
			 set(txt1,"opacity","1",begin);
			 while ( comes[next]!=-1 ) {
			 			 // Animation
						 anm_motion(cl,comes[next],next,begin,dur1,1);
						 anm_motion(txt,comes[next],next,begin,dur1,1);
						 anm_motion(cl1,next,comes[next],begin,dur1,0);
						 anm_motion(txt1,next,comes[next],begin,dur1,0);
						 
						 for ( j=0 ; j<nodes[comes[next]].elist.length && edges[nodes[comes[next]].elist[j]].n2!=next ; j++ );
						 e1 = nodes[comes[next]].elist[j];
						 edgeslen[e1]-=cur_flow;
						 for ( j=0 ; j<nodes[next].elist.length && edges[nodes[next].elist[j]].n2!=comes[next] ; j++ );
						 e2 = nodes[next].elist[j];
						 edgeslen[e2]+=cur_flow;
						 anm_color(edges[e1].gi,"stroke",EACTIVE,EVISITED,begin,dur1,1);
 						 anm_color(edges[e2].gi,"stroke",EACTIVE,EVISITED,begin,dur1,1);
						 anm_opacity(edgetxt[e1],1,0,begin,dur2,1);
						 anm_opacity(edgetxt[e2],1,0,begin,dur2,1);
						 begin+=dur2;
							
						 etxt = label_node3(els[e1],edgeslen[e1],"white","black",0);
						 edgetxt[e1] = etxt;
						 etxt.setAttribute("opacity","0");
						 anm_opacity(etxt,0,1,begin,dur2,1);
						
						 etxt = label_node3(els[e2],edgeslen[e2],"white","black",0);
						 edgetxt[e2] = etxt;
						 etxt.setAttribute("opacity","0");							
						 anm_opacity(etxt,0,1,begin,dur2,1);
						 begin+=dur2;
						 
						 next = comes[next]; 						 						 						 
			 }
 			 set(start_p_txt,"opacity","0",begin);
  		 start_p_txt = label_node(start_p,-max_flow,"black","black",0);
  		 start_p_txt.setAttribute("opacity","0");
  		 set(start_p_txt,"opacity","1",begin);
		}
		
	}while(cur_flow!=0);
		 
	 bar("Max Flow is "+max_flow.toString(10));
	 max_flow=0;
  }

}
// the end :)

