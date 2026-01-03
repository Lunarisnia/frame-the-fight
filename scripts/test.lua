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

function send_json_to_browser(eventName, payload)
	local browser = obs.obs_get_source_by_name("Browser")
	if browser then
		print(obs.obs_source_get_id(browser))
		local cd = obs.calldata_create()
		obs.calldata_set_string(cd, "eventName", eventName)
		obs.calldata_set_string(cd, "jsonString", payload)
		obs.proc_handler_call(obs.obs_source_get_proc_handler(browser), "javascript_event", cd)

		obs.calldata_destroy(cd)
		obs.obs_source_release(browser)
		print("EVENT SENT")
	end
end

-- -------------- HOTKEY ---------------- --
function on_send_message()
	send_json_to_browser()
end

hotkey_id = obs.OBS_INVALID_HOTKEY_ID

function script_load()
	hotkey_id = obs.obs_hotkey_register_frontend(script_path(), "Send Event", on_send_message)
	local hotkey_save_array = obs.obs_data_get_array(settings, "send_event")
	obs.obs_hotkey_load(hotkey_id, hotkey_save_array)
	obs.obs_data_array_release(hotkey_save_array)
	send_json_to_browser("myTestEvent", "{}")
end

function script_save()
	local hotkey_save_array = obs.obs_hotkey_save(hotkey_id)
	obs.obs_data_set_array(settings, "send_event", hotkey_save_array)
	obs.obs_data_array_release(hotkey_save_array)
end

function script_defaults(settings)
	local default_team = "TEAM"
	local default_country = "ID"

	local player1_default_name = "Player 1"
	obs.obs_data_set_default_string(settings, "player1_name", player1_default_name)
	send_json_to_browser("player1_name", string.format('{"name":"%s"}', player1_default_name))
	obs.obs_data_set_default_string(settings, "player1_team", default_team)
	send_json_to_browser("player1_team", string.format('{"name":"%s"}', default_team))
	obs.obs_data_set_default_string(settings, "player1_country", default_country)
	send_json_to_browser("player1_country", string.format('{"name":"%s"}', default_country))
	obs.obs_data_set_default_int(settings, "player1_score", 0)
	send_json_to_browser("player1_score", string.format('{"score":%d}', 0))

	local player2_default_name = "Player 2"
	obs.obs_data_set_default_string(settings, "player2_name", player2_default_name)
	send_json_to_browser("player2_name", string.format('{"name":"%s"}', player2_default_name))
	obs.obs_data_set_default_string(settings, "player2_team", "TEAM")
	send_json_to_browser("player2_team", string.format('{"name":"%s"}', default_team))
	obs.obs_data_set_default_string(settings, "player2_country", "GB")
	send_json_to_browser("player2_country", string.format('{"name":"%s"}', default_country))
	obs.obs_data_set_default_int(settings, "player2_score", 0)
	send_json_to_browser("player2_score", string.format('{"score":%d}', 0))
end

function script_properties()
	props = obs.obs_properties_create()

	local player1_group = obs.obs_properties_create()
	obs.obs_properties_add_text(player1_group, "player1_name", "Player Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player1_group, "player1_team", "Team Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player1_group, "player1_country", "Country", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_int(player1_group, "player1_score", "Score", 0, 99, 1)

	obs.obs_properties_add_group(props, "player1_group", "Player 1 (Left)", obs.OBS_GROUP_NORMAL, player1_group)

	local player2_group = obs.obs_properties_create()
	obs.obs_properties_add_text(player2_group, "player2_name", "Player Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player2_group, "player2_team", "Team Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player2_group, "player2_country", "Country", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_int(player2_group, "player2_score", "Score", 0, 99, 1)

	obs.obs_properties_add_group(props, "player1_group", "Player 1 (Left)", obs.OBS_GROUP_NORMAL, player1_group)
	obs.obs_properties_add_group(props, "player2_group", "Player 2 (Right)", obs.OBS_GROUP_NORMAL, player2_group)

	-- obs.obs_properties_add_float_slider(props, "frequency", "Shake frequency", 0.1, 20, 0.1)
	-- obs.obs_properties_add_int_slider(props, "amplitude", "Shake amplitude", 0, 90, 1)
	return props
end

player1 = {}
player2 = {}

function script_update(settings)
	local player1_name = obs.obs_data_get_string(settings, "player1_name")
	if player1["name"] ~= player1_name then
		player1["name"] = player1_name
		send_json_to_browser("player1_name", string.format('{"name":"%s"}', player1["name"]))
	end
	local player1_team = obs.obs_data_get_string(settings, "player1_team")
	if player1["team"] ~= player1_team then
		player1["team"] = player1_team
		send_json_to_browser("player1_team", string.format('{"name":"%s"}', player1_team))
	end
	local player1_country = obs.obs_data_get_string(settings, "player1_country")
	if player1["country"] ~= player1_country then
		player1["country"] = player1_country
		send_json_to_browser("player1_country", string.format('{"name":"%s"}', player1_country))
	end
	local player1_score = obs.obs_data_get_int(settings, "player1_score")
	if player1["score"] ~= player1_score then
		player1["score"] = player1_score
		send_json_to_browser("player1_score", string.format('{"score":%d}', player1_score))
	end

	-- ================ PLAYER 2 ====================

	local player2_name = obs.obs_data_get_string(settings, "player2_name")
	if player2["name"] ~= player2_name then
		player2["name"] = player2_name
		send_json_to_browser("player2_name", string.format('{"name":"%s"}', player2["name"]))
	end
	local player2_team = obs.obs_data_get_string(settings, "player2_team")
	if player2["team"] ~= player2_team then
		player2["team"] = player2_team
		send_json_to_browser("player2_team", string.format('{"name":"%s"}', player2_team))
	end
	local player2_country = obs.obs_data_get_string(settings, "player2_country")
	if player2["country"] ~= player2_country then
		player2["country"] = player2_country
		send_json_to_browser("player2_country", string.format('{"name":"%s"}', player2_country))
	end
	local player2_score = obs.obs_data_get_int(settings, "player2_score")
	if player2["score"] ~= player2_score then
		player2["score"] = player2_score
		send_json_to_browser("player2_score", string.format('{"score":%d}', player2_score))
	end
end
