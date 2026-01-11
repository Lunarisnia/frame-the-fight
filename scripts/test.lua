local bit = require("bit") -- Standard in LuaJIT
obs = obslua

source_name = "Browser"

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
	local browser = obs.obs_get_source_by_name(source_name)
	if browser then
		local cd = obs.calldata_create()
		obs.calldata_set_string(cd, "eventName", eventName)
		obs.calldata_set_string(cd, "jsonString", payload)
		obs.proc_handler_call(obs.obs_source_get_proc_handler(browser), "javascript_event", cd)

		obs.calldata_destroy(cd)
		obs.obs_source_release(browser)
	end
end

-- -------------- HOTKEY ---------------- --
function on_increment_score(target)
	return function(pressed)
		if not pressed then
			return false
		end
		if target == "player1" then
			if g_settings then
				player1["score"] = math.min(player1["score"] + 1, 99)
				obs.obs_data_set_int(g_settings, "player1_score", player1["score"])
				send_json_to_browser("player1_score", string.format('{"score":%d}', player1["score"]))
				return true
			end
		else
			if g_settings then
				player2["score"] = math.min(player2["score"] + 1, 99)
				obs.obs_data_set_int(g_settings, "player2_score", player2["score"])
				send_json_to_browser("player2_score", string.format('{"score":%d}', player2["score"]))
				return true
			end
		end
	end
end

function on_decrement_score(target)
	return function(pressed)
		if not pressed then
			return false
		end
		if target == "player1" then
			if g_settings then
				player1["score"] = math.max(player1["score"] - 1, 0)
				obs.obs_data_set_int(g_settings, "player1_score", player1["score"])
				send_json_to_browser("player1_score", string.format('{"score":%d}', player1["score"]))
				return true
			end
		else
			if g_settings then
				player2["score"] = math.max(player2["score"] - 1, 0)
				obs.obs_data_set_int(g_settings, "player2_score", player2["score"])
				send_json_to_browser("player2_score", string.format('{"score":%d}', player2["score"]))
				return true
			end
		end
	end
end

hotkeys = {
	increment_score_p1 = obs.OBS_INVALID_HOTKEY_ID,
	increment_score_p2 = obs.OBS_INVALID_HOTKEY_ID,

	decrement_score_p1 = obs.OBS_INVALID_HOTKEY_ID,
	decrement_score_p2 = obs.OBS_INVALID_HOTKEY_ID,

	reset_scores = obs.OBS_INVALID_HOTKEY_ID,
	swap_players = obs.OBS_INVALID_HOTKEY_ID,
}
hotkeys_callback = {
	increment_score_p1 = on_increment_score("player1"),
	increment_score_p2 = on_increment_score("player2"),

	decrement_score_p1 = on_decrement_score("player1"),
	decrement_score_p2 = on_decrement_score("player2"),

	reset_scores = function()
		return on_reset_scores()
	end,
	swap_players = function()
		return on_swap_players()
	end,
}
hotkeys_label = {
	increment_score_p1 = "Increment Score (P1/Left)",
	increment_score_p2 = "Increment Score (P2/Right)",

	decrement_score_p1 = "Decrement Score (P1/Left)",
	decrement_score_p2 = "Decrement Score (P2/Right)",

	reset_scores = "Reset Scores",
	swap_players = "Swap Players",
}

function script_load(settings)
	for key, _ in pairs(hotkeys) do
		hotkeys[key] = obs.obs_hotkey_register_frontend(script_path(), hotkeys_label[key], hotkeys_callback[key])
		local hotkey_save_array = obs.obs_data_get_array(settings, key)
		obs.obs_hotkey_load(hotkeys[key], hotkey_save_array)
		obs.obs_data_array_release(hotkey_save_array)
	end
end

function script_save(settings)
	for key, _ in pairs(hotkeys) do
		local hotkey_save_array = obs.obs_hotkey_save(hotkeys[key])
		obs.obs_data_set_array(settings, key, hotkey_save_array)
		obs.obs_data_array_release(hotkey_save_array)
	end
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

	local player2_default_name = "Player 2 (L)"
	obs.obs_data_set_default_string(settings, "player2_name", player2_default_name)
	send_json_to_browser("player2_name", string.format('{"name":"%s"}', player2_default_name))
	obs.obs_data_set_default_string(settings, "player2_team", "TEAM")
	send_json_to_browser("player2_team", string.format('{"name":"%s"}', default_team))
	obs.obs_data_set_default_string(settings, "player2_country", "GB")
	send_json_to_browser("player2_country", string.format('{"name":"%s"}', default_country))
	obs.obs_data_set_default_int(settings, "player2_score", 0)
	send_json_to_browser("player2_score", string.format('{"score":%d}', 0))

	obs.obs_data_set_default_string(settings, "group_stage", "Grand Final")
	send_json_to_browser("group_stage", string.format('{"name":"%s"}', "Grand Final"))

	obs.obs_data_set_default_bool(settings, "player1_name_plate", true)
	send_json_to_browser("player1_name_plate", string.format('{"value":%s}', true))
	obs.obs_data_set_default_bool(settings, "player1_score_plate", true)
	send_json_to_browser("player1_score_plate", string.format('{"value":%s}', true))
	obs.obs_data_set_default_bool(settings, "player1_country_plate", true)
	send_json_to_browser("player1_country_plate", string.format('{"value":%s}', true))

	obs.obs_data_set_default_bool(settings, "player2_name_plate", true)
	send_json_to_browser("player2_name_plate", string.format('{"value":%s}', true))
	obs.obs_data_set_default_bool(settings, "player2_score_plate", true)
	send_json_to_browser("player2_score_plate", string.format('{"value":%s}', true))
	obs.obs_data_set_default_bool(settings, "player2_country_plate", true)
	send_json_to_browser("player2_country_plate", string.format('{"value":%s}', true))

	obs.obs_data_set_default_bool(settings, "group_stage_plate", true)
	send_json_to_browser("group_stage_plate", string.format('{"value":%s}', true))
	obs.obs_data_set_default_bool(settings, "tournament_logo_plate", true)
	send_json_to_browser("tournament_logo_plate", string.format('{"value":%s}', true))
end

function on_reset_layout()
	send_json_to_browser("reset_position", "{}")
end

g_settings = nil

function on_swap_players()
	local temp_player = player1
	player1 = player2
	player2 = temp_player

	send_json_to_browser("player1_name", string.format('{"name":"%s"}', player1["name"]))
	send_json_to_browser("player1_team", string.format('{"name":"%s"}', player1["team"]))
	send_json_to_browser("player1_country", string.format('{"name":"%s"}', player1["country"]))
	send_json_to_browser("player1_score", string.format('{"score":%d}', player1["score"]))

	send_json_to_browser("player2_name", string.format('{"name":"%s"}', player2["name"]))
	send_json_to_browser("player2_team", string.format('{"name":"%s"}', player2["team"]))
	send_json_to_browser("player2_country", string.format('{"name":"%s"}', player2["country"]))
	send_json_to_browser("player2_score", string.format('{"score":%d}', player2["score"]))
	if g_settings then
		obs.obs_data_set_string(g_settings, "player1_name", player1["name"])
		obs.obs_data_set_string(g_settings, "player1_team", player1["team"])
		obs.obs_data_set_string(g_settings, "player1_country", player1["country"])
		obs.obs_data_set_int(g_settings, "player1_score", player1["score"])

		obs.obs_data_set_string(g_settings, "player2_name", player2["name"])
		obs.obs_data_set_string(g_settings, "player2_team", player2["team"])
		obs.obs_data_set_string(g_settings, "player2_country", player2["country"])
		obs.obs_data_set_int(g_settings, "player2_score", player2["score"])
		return true
	end
	return false
end

function on_reset_scores()
	send_json_to_browser("player1_score", string.format('{"score":%d}', 0))
	send_json_to_browser("player2_score", string.format('{"score":%d}', 0))
	player1["score"] = 0
	player2["score"] = 0
	if g_settings then
		obs.obs_data_set_int(g_settings, "player1_score", 0)
		obs.obs_data_set_int(g_settings, "player2_score", 0)
		return true
	end
	return false
end

function populate_list_with_countries(prop)
	for name, code in pairs(COUNTRIES) do
		obs.obs_property_list_add_string(prop, name, code)
	end
end

function populate_list_property_with_source_names(list_property)
	local sources = obs.obs_enum_sources()
	obs.obs_property_list_clear(list_property)
	obs.obs_property_list_add_string(list_property, "", "")
	for _, source in pairs(sources) do
		local name = obs.obs_source_get_name(source)
		obs.obs_property_list_add_string(list_property, name, name)
	end
	obs.source_list_release(sources)
end

-- This function reads the file into a binary string
function read_image_binary(path)
	if path == nil or path == "" then
		return nil
	end

	-- "rb" stands for Read Binary
	local file, err = io.open(path, "rb")

	if not file then
		print("Error opening file: " .. tostring(err))
		return nil
	end

	-- Read the entire content of the file
	local data = file:read("*all")
	file:close()

	return data
end

-- This encodes it in base64 for transfer
function base64_encode(data)
	local charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	local buffer = {}

	for i = 1, #data, 3 do
		-- Get byte values
		local b1 = data:byte(i)
		local b2 = data:byte(i + 1)
		local b3 = data:byte(i + 2)

		-- Combine into a 24-bit integer using bit.lshift and bit.bor
		local n = bit.bor(bit.lshift(b1, 16), bit.lshift(b2 or 0, 8), b3 or 0)

		-- Extract 6-bit chunks using bit.rshift and bit.band
		local v1 = bit.band(bit.rshift(n, 18), 0x3F)
		local v2 = bit.band(bit.rshift(n, 12), 0x3F)
		local v3 = bit.band(bit.rshift(n, 6), 0x3F)
		local v4 = bit.band(n, 0x3F)

		-- Map to characters
		table.insert(buffer, charset:sub(v1 + 1, v1 + 1))
		table.insert(buffer, charset:sub(v2 + 1, v2 + 1))

		-- Handle padding logic
		table.insert(buffer, b2 and charset:sub(v3 + 1, v3 + 1) or "=")
		table.insert(buffer, b3 and charset:sub(v4 + 1, v4 + 1) or "=")
	end

	return table.concat(buffer)
end

function script_properties()
	props = obs.obs_properties_create()

	local list_property = obs.obs_properties_add_list(
		props,
		"source_name",
		"Browser Source Name",
		obs.OBS_COMBO_TYPE_LIST,
		obs.OBS_COMBO_FORMAT_STRING
	)
	populate_list_property_with_source_names(list_property)
	-- ==== THINGY
	obs.obs_properties_add_button(props, "swap_players", "Swap Players", on_swap_players)
	obs.obs_properties_add_button(props, "reset_scores", "Reset Scores", on_reset_scores)
	obs.obs_properties_add_path(
		props,
		"player1_name_plate_artwork",
		"Name Plate Artwork",
		obs.OBS_PATH_FILE,
		"*.png *.jpeg *jpg",
		nil
	)

	local player1_group = obs.obs_properties_create()

	obs.obs_properties_add_text(player1_group, "player1_name", "Player Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player1_group, "player1_team", "Team Name", obs.OBS_TEXT_DEFAULT)
	local list_property1 = obs.obs_properties_add_list(
		player1_group,
		"player1_country",
		"Country",
		obs.OBS_COMBO_TYPE_LIST,
		obs.OBS_COMBO_FORMAT_STRING
	)
	populate_list_with_countries(list_property1)
	obs.obs_properties_add_int(player1_group, "player1_score", "Score", 0, 99, 1)

	obs.obs_properties_add_group(props, "player1_group", "Player 1 (Left)", obs.OBS_GROUP_NORMAL, player1_group)

	local player2_group = obs.obs_properties_create()
	obs.obs_properties_add_text(player2_group, "player2_name", "Player Name", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_text(player2_group, "player2_team", "Team Name", obs.OBS_TEXT_DEFAULT)
	local list_property2 = obs.obs_properties_add_list(
		player2_group,
		"player2_country",
		"Country",
		obs.OBS_COMBO_TYPE_LIST,
		obs.OBS_COMBO_FORMAT_STRING
	)
	populate_list_with_countries(list_property2)
	obs.obs_properties_add_int(player2_group, "player2_score", "Score", 0, 99, 1)

	obs.obs_properties_add_group(props, "player2_group", "Player 2 (Right)", obs.OBS_GROUP_NORMAL, player2_group)

	obs.obs_properties_add_text(props, "group_stage", "Group Stage", obs.OBS_TEXT_DEFAULT)
	obs.obs_properties_add_button(props, "reset_position", "Reset Layout", on_reset_layout)

	local visibility_group = obs.obs_properties_create()

	local visibility_group_player1 = obs.obs_properties_create()
	obs.obs_properties_add_bool(visibility_group_player1, "player1_name_plate", "Name")
	obs.obs_properties_add_bool(visibility_group_player1, "player1_score_plate", "Score")
	obs.obs_properties_add_bool(visibility_group_player1, "player1_country_plate", "Country")

	local visibility_group_player2 = obs.obs_properties_create()
	obs.obs_properties_add_bool(visibility_group_player2, "player2_name_plate", "Name")
	obs.obs_properties_add_bool(visibility_group_player2, "player2_score_plate", "Score")
	obs.obs_properties_add_bool(visibility_group_player2, "player2_country_plate", "Country")

	obs.obs_properties_add_group(
		visibility_group,
		"visibility_group_player1",
		"Player 1 (Left)",
		obs.OBS_GROUP_NORMAL,
		visibility_group_player1
	)
	obs.obs_properties_add_group(
		visibility_group,
		"visibility_group_player2",
		"Player 2 (Right)",
		obs.OBS_GROUP_NORMAL,
		visibility_group_player2
	)

	obs.obs_properties_add_bool(visibility_group, "group_stage_plate", "Group Stage")
	obs.obs_properties_add_bool(visibility_group, "tournament_logo_plate", "Tournament Logo")
	obs.obs_properties_add_group(props, "visibility_group", "Toggle Visibility", obs.OBS_GROUP_NORMAL, visibility_group)
	return props
end

player1 = {}
player2 = {}
stage = ""

function script_update(settings)
	g_settings = settings
	local s_name = obs.obs_data_get_string(settings, "source_name")
	source_name = s_name

	local player1_name_plate_artwork = obs.obs_data_get_string(settings, "player1_name_plate_artwork")
	if player1["name_plate_artwork"] ~= player1_name_plate_artwork then
		local bin = read_image_binary(player1_name_plate_artwork)
		local encoded = base64_encode(bin)
		player1["name_plate_artwork"] = player1_name_plate_artwork
		send_json_to_browser("player1_name_plate_artwork", string.format('{"image":"%s"}', encoded))
	end

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

	local player1_name_plate = obs.obs_data_get_bool(settings, "player1_name_plate")
	if player1["name_plate"] ~= player1_name_plate then
		player1["name_plate"] = player1_name_plate
		send_json_to_browser("player1_name_plate", string.format('{"value":%s}', player1_name_plate))
	end
	local player1_score_plate = obs.obs_data_get_bool(settings, "player1_score_plate")
	if player1["score_plate"] ~= player1_score_plate then
		player1["score_plate"] = player1_score_plate
		send_json_to_browser("player1_score_plate", string.format('{"value":%s}', player1_score_plate))
	end
	local player1_country_plate = obs.obs_data_get_bool(settings, "player1_country_plate")
	if player1["country_plate"] ~= player1_country_plate then
		player1["country_plate"] = player1_country_plate
		send_json_to_browser("player1_country_plate", string.format('{"value":%s}', player1_country_plate))
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
		print(player2_country)
		send_json_to_browser("player2_country", string.format('{"name":"%s"}', player2_country))
	end
	local player2_score = obs.obs_data_get_int(settings, "player2_score")
	if player2["score"] ~= player2_score then
		player2["score"] = player2_score
		send_json_to_browser("player2_score", string.format('{"score":%d}', player2_score))
	end

	local player2_name_plate = obs.obs_data_get_bool(settings, "player2_name_plate")
	if player2["name_plate"] ~= player2_name_plate then
		player2["name_plate"] = player2_name_plate
		send_json_to_browser("player2_name_plate", string.format('{"value":%s}', player2_name_plate))
	end
	local player2_score_plate = obs.obs_data_get_bool(settings, "player2_score_plate")
	if player2["score_plate"] ~= player2_score_plate then
		player2["score_plate"] = player2_score_plate
		send_json_to_browser("player2_score_plate", string.format('{"value":%s}', player2_score_plate))
	end
	local player2_country_plate = obs.obs_data_get_bool(settings, "player2_country_plate")
	if player2["country_plate"] ~= player2_country_plate then
		player2["country_plate"] = player2_country_plate
		send_json_to_browser("player2_country_plate", string.format('{"value":%s}', player2_country_plate))
	end

	-- =============== STAGE ================
	local group_stage = obs.obs_data_get_string(settings, "group_stage")
	if stage ~= group_stage then
		stage = group_stage
		send_json_to_browser("group_stage", string.format('{"name":"%s"}', group_stage))
	end

	local group_stage_plate = obs.obs_data_get_bool(settings, "group_stage_plate")
	if player2["group_stage_plate"] ~= group_stage_plate then
		player2["group_stage_plate"] = group_stage_plate
		send_json_to_browser("group_stage_plate", string.format('{"value":%s}', group_stage_plate))
	end
	local tournament_logo_plate = obs.obs_data_get_bool(settings, "tournament_logo_plate")
	if player2["tournament_logo_plate"] ~= tournament_logo_plate then
		player2["tournament_logo_plate"] = tournament_logo_plate
		send_json_to_browser("tournament_logo_plate", string.format('{"value":%s}', tournament_logo_plate))
	end
end

--- =================== COUNTRIES LIST ===========================
--- Cause I don't want to deal with external files other than the UI related one (for now)
--- --  COUNTRIES – mapping from full country name → ISO‑3166‑1 alpha‑2 code
--  (values taken from ISO 3166‑1 – see source id="6")
COUNTRIES = {
	["Afghanistan"] = "AF",
	["Åland Islands"] = "AX",
	["Albania"] = "AL",
	["Algeria"] = "DZ",
	["American Samoa"] = "AS",
	["Andorra"] = "AD",
	["Angola"] = "AO",
	["Anguilla"] = "AI",
	["Antarctica"] = "AQ",
	["Antigua and Barbuda"] = "AG",
	["Argentina"] = "AR",
	["Armenia"] = "AM",
	["Aruba"] = "AW",
	["Australia"] = "AU",
	["Austria"] = "AT",
	["Azerbaijan"] = "AZ",
	["Bahamas (the)"] = "BS",
	["Bahrain"] = "BH",
	["Bangladesh"] = "BD",
	["Barbados"] = "BB",
	["Belarus"] = "BY",
	["Belgium"] = "BE",
	["Belize"] = "BZ",
	["Benin"] = "BJ",
	["Bermuda"] = "BM",
	["Bhutan"] = "BT",
	["Bolivia (Plurinational State of)"] = "BO",
	["Bonaire, Sint Eustatius and Saba"] = "BQ",
	["Bosnia and Herzegovina"] = "BA",
	["Botswana"] = "BW",
	["Bouvet Island"] = "BV",
	["Brazil"] = "BR",
	["British Indian Ocean Territory (the)"] = "IO",
	["Brunei Darussalam"] = "BN",
	["Bulgaria"] = "BG",
	["Burkina Faso"] = "BF",
	["Burundi"] = "BI",
	["Cabo Verde"] = "CV",
	["Cambodia"] = "KH",
	["Cameroon"] = "CM",
	["Canada"] = "CA",
	["Cayman Islands (the)"] = "KY",
	["Central African Republic (the)"] = "CF",
	["Chad"] = "TD",
	["Chile"] = "CL",
	["China"] = "CN",
	["Christmas Island"] = "CX",
	["Cocos (Keeling) Islands (the)"] = "CC",
	["Colombia"] = "CO",
	["Comoros (the)"] = "KM",
	["Congo (the Democratic Republic of the)"] = "CD",
	["Congo (the)"] = "CG",
	["Cook Islands (the)"] = "CK",
	["Costa Rica"] = "CR",
	["Côte d'Ivoire"] = "CI",
	["Croatia"] = "HR",
	["Cuba"] = "CU",
	["Curaçao"] = "CW",
	["Cyprus"] = "CY",
	["Czechia"] = "CZ",
	["Denmark"] = "DK",
	["Djibouti"] = "DJ",
	["Dominica"] = "DM",
	["Dominican Republic (the)"] = "DO",
	["Ecuador"] = "EC",
	["Egypt"] = "EG",
	["El Salvador"] = "SV",
	["Equatorial Guinea"] = "GQ",
	["Eritrea"] = "ER",
	["Estonia"] = "EE",
	["Eswatini"] = "SZ",
	["Ethiopia"] = "ET",
	["Falkland Islands (the) [Malvinas]"] = "FK",
	["Faroe Islands (the)"] = "FO",
	["Fiji"] = "FJ",
	["Finland"] = "FI",
	["France"] = "FR",
	["French Guiana"] = "GF",
	["French Polynesia"] = "PF",
	["French Southern Territories (the)"] = "TF",
	["Gabon"] = "GA",
	["Gambia (the)"] = "GM",
	["Georgia"] = "GE",
	["Germany"] = "DE",
	["Ghana"] = "GH",
	["Gibraltar"] = "GI",
	["Greece"] = "GR",
	["Greenland"] = "GL",
	["Grenada"] = "GD",
	["Guadeloupe"] = "GP",
	["Guam"] = "GU",
	["Guatemala"] = "GT",
	["Guernsey"] = "GG",
	["Guinea"] = "GN",
	["Guinea-Bissau"] = "GW",
	["Guyana"] = "GY",
	["Haiti"] = "HT",
	["Heard Island and McDonald Islands"] = "HM",
	["Holy See (the)"] = "VA",
	["Honduras"] = "HN",
	["Hong Kong"] = "HK",
	["Hungary"] = "HU",
	["Iceland"] = "IS",
	["India"] = "IN",
	["Indonesia"] = "ID",
	["Iran (Islamic Republic of)"] = "IR",
	["Iraq"] = "IQ",
	["Ireland"] = "IE",
	["Isle of Man"] = "IM",
	["Israel"] = "IL",
	["Italy"] = "IT",
	["Jamaica"] = "JM",
	["Japan"] = "JP",
	["Jersey"] = "JE",
	["Jordan"] = "JO",
	["Kazakhstan"] = "KZ",
	["Kenya"] = "KE",
	["Kiribati"] = "KI",
	["Korea (the Democratic People's Republic of)"] = "KP",
	["Korea (the Republic of)"] = "KR",
	["Kuwait"] = "KW",
	["Kyrgyzstan"] = "KG",
	["Lao People's Democratic Republic (the)"] = "LA",
	["Latvia"] = "LV",
	["Lebanon"] = "LB",
	["Lesotho"] = "LS",
	["Liberia"] = "LR",
	["Libya"] = "LY",
	["Liechtenstein"] = "LI",
	["Lithuania"] = "LT",
	["Luxembourg"] = "LU",
	["Macao"] = "MO",
	["Republic of North Macedonia"] = "MK",
	["Madagascar"] = "MG",
	["Malawi"] = "MW",
	["Malaysia"] = "MY",
	["Maldives"] = "MV",
	["Mali"] = "ML",
	["Malta"] = "MT",
	["Marshall Islands (the)"] = "MH",
	["Martinique"] = "MQ",
	["Mauritania"] = "MR",
	["Mauritius"] = "MU",
	["Mayotte"] = "YT",
	["Mexico"] = "MX",
	["Micronesia (Federated States of)"] = "FM",
	["Moldova (the Republic of)"] = "MD",
	["Monaco"] = "MC",
	["Mongolia"] = "MN",
	["Montenegro"] = "ME",
	["Montserrat"] = "MS",
	["Morocco"] = "MA",
	["Mozambique"] = "MZ",
	["Myanmar"] = "MM",
	["Namibia"] = "NA",
	["Nauru"] = "NR",
	["Nepal"] = "NP",
	["Netherlands (the)"] = "NL",
	["New Caledonia"] = "NC",
	["New Zealand"] = "NZ",
	["Nicaragua"] = "NI",
	["Niger (the)"] = "NE",
	["Nigeria"] = "NG",
	["Niue"] = "NU",
	["Norfolk Island"] = "NF",
	["Northern Mariana Islands (the)"] = "MP",
	["Norway"] = "NO",
	["Oman"] = "OM",
	["Pakistan"] = "PK",
	["Palau"] = "PW",
	["Palestine"] = "PS",
	["Panama"] = "PA",
	["Papua New Guinea"] = "PG",
	["Paraguay"] = "PY",
	["Peru"] = "PE",
	["Philippines (the)"] = "PH",
	["Pitcairn"] = "PN",
	["Poland"] = "PL",
	["Portugal"] = "PT",
	["Puerto Rico"] = "PR",
	["Qatar"] = "QA",
	["Réunion"] = "RE",
	["Romania"] = "RO",
	["Russian Federation (the)"] = "RU",
	["Rwanda"] = "RW",
	["Saint Barthélemy"] = "BL",
	["Saint Helena, Ascension and Tristan da Cunha"] = "SH",
	["Saint Kitts and Nevis"] = "KN",
	["Saint Lucia"] = "LC",
	["Saint Martin (French part)"] = "MF",
	["Saint Pierre and Miquelon"] = "PM",
	["Saint Vincent and the Grenadines"] = "VC",
	["Samoa"] = "WS",
	["San Marino"] = "SM",
	["Sao Tome and Principe"] = "ST",
	["Saudi Arabia"] = "SA",
	["Senegal"] = "SN",
	["Serbia"] = "RS",
	["Seychelles"] = "SC",
	["Sierra Leone"] = "SL",
	["Singapore"] = "SG",
	["Slovakia"] = "SK",
	["Slovenia"] = "SI",
	["Solomon Islands"] = "SB",
	["Somalia"] = "SO",
	["South Africa"] = "ZA",
	["South Georgia and the South Sandwich Islands"] = "GS",
	["South Sudan"] = "SS",
	["Spain"] = "ES",
	["Sri Lanka"] = "LK",
	["Sudan"] = "SD",
	["Suriname"] = "SR",
	["Svalbard and Jan Mayen"] = "SJ",
	["Swaziland"] = "SZ",
	["Sweden"] = "SE",
	["Switzerland"] = "CH",
	["Syrian Arab Republic"] = "SY",
	["Taiwan (Province of China)"] = "TW",
	["Tajikistan"] = "TJ",
	["Tanzania, United Republic of"] = "TZ",
	["Thailand"] = "TH",
	["Timor-Leste"] = "TL",
	["Togo"] = "TG",
	["Tokelau"] = "TK",
	["Tonga"] = "TO",
	["Trinidad and Tobago"] = "TT",
	["Tunisia"] = "TN",
	["Turkey"] = "TR",
	["Turkmenistan"] = "TM",
	["Turks and Caicos Islands (the)"] = "TC",
	["Tuvalu"] = "TV",
	["Uganda"] = "UG",
	["Ukraine"] = "UA",
	["United Arab Emirates (the)"] = "AE",
	["United Kingdom of Great Britain and Northern Ireland (the)"] = "GB",
	["United States Minor Outlying Islands (the)"] = "UM",
	["United States of America (the)"] = "US",
	["Uruguay"] = "UY",
	["Uzbekistan"] = "UZ",
	["Vanuatu"] = "VU",
	["Venezuela (Bolivarian Republic of)"] = "VE",
	["Viet Nam"] = "VN",
	["Virgin Islands (British)"] = "VG",
	["Virgin Islands (U.S.)"] = "VI",
	["Wallis and Futuna"] = "WF",
	["Western Sahara"] = "EH",
	["Yemen"] = "YE",
	["Zambia"] = "ZM",
	["Zimbabwe"] = "ZW",
}
