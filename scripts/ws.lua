obs = obslua

function script_description()
	return [[
	   <center><h2>Frame The Fight</h2></center>
           <p>
	   This controls the overlay from the browser source. Go to <em>Settings
           </em> then <em>Hotkeys</em> to select the key combination.
	   </p>
	   <p>
		Buy me coffee <a href="https://google.com">here</a>
           </p>
	   ]]
end

function script_load()
	print("LOADED")
	obs.obs_frontend_push_event("CustomEvent", { foo = "bar" })
end
